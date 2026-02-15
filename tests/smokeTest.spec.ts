import { expect } from '@playwright/test';
import { apiTest } from './fixtures/apiFixtures';
import { InvalidAuthSchema, ValidAuthSchema } from '../schemas/auth.schema';
import { BookingsSchema } from '../schemas/bookings.schema';

apiTest.describe('herokuapp smoke tests', () => {
  let id: number

  apiTest('Auth health check', async ({ request }) => {
    const resp = await request.get('/ping')
    const status = resp.status();
    const text = await resp.text();
    expect(status, `GET /ping has failed with response ${text}`).toBe(201);

  });

  apiTest('Valid Auth', async ({ authApi, authPayload }) => {
    const authResp = await authApi.postAuth(authPayload);
    expect(authResp.status, authResp.text).toBe(200);
    let token = authResp.body.token
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0)
    ValidAuthSchema.parse(authResp.body)
  });

  apiTest('Invalid Auth', async ({ authApi, invalidAuthPayload }) => {
    const authResp = await authApi.postAuth(invalidAuthPayload);
    expect(authResp.status, authResp.text).toBe(200)
    let token = authResp.body.token
    expect(token).toBeUndefined()
    expect(authResp.body).toMatchObject({ reason : "Bad credentials"} )
    InvalidAuthSchema.parse(authResp.body)
  });

  apiTest('POST Booking', async ({ authApi, authPayload, bookingApi, bookingPayload }) => {
    const authResp = await authApi.postAuth(authPayload);
    expect(authResp.status, authResp.text).toBe(200);
    let token = authResp.body.token;

    bookingApi.setAuth(token);

    const resp = await bookingApi.PostBooking(bookingPayload)
    expect(resp.status, resp.text).toBe(200);
    expect(resp.body).not.toBeNull();
    expect(resp.body!.booking.firstname).toBe(bookingPayload.firstname)
    id = resp.body!.bookingid;
    expect(id).toEqual(expect.any(Number))

    const getBooking = await bookingApi.GetBooking(id);
    expect(getBooking.status, getBooking.text).toBe(200);
    expect(getBooking.body).not.toBeNull()
    expect(getBooking.body?.firstname).toBe(bookingPayload.firstname)
    BookingsSchema.parse(getBooking.body)

    const deleteResp = await bookingApi.DeleteBooking(id);
    expect(deleteResp.status, deleteResp.text).toBe(201);

  });

  apiTest('GET Bookings', async ({ bookingApi }) => {
    const resp = await bookingApi.GetBookings()
    expect(resp.status, resp.text).toBe(200);
    expect(resp.body).not.toBeNull()
    if(resp.body!.length > 0){
      expect(resp.body![0]).toMatchObject({ bookingid: expect.any(Number)})
    }
    
  });
  
})



