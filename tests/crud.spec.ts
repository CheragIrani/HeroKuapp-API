import { expect } from '@playwright/test';
import { apiTest } from './fixtures/apiFixtures';

apiTest.describe('herokuapp crud tests', () => {
  let id: number
  let token: string

  apiTest.beforeEach('Set Token', async ({ authApi, authPayload }) => {
    const authResp = await authApi.postAuth(authPayload);
    expect(authResp.status, authResp.text).toBe(200);
    token = authResp.body.token;
  })

  apiTest.afterEach('Delete booking', async ({ bookingApi}) => {
    bookingApi.setAuth(token)
    const resp = await bookingApi.DeleteBooking(id);
    expect(resp.status, resp.text).toBe(201)

  })

  apiTest('UPDATE Bookings with invalid auth', async ({ bookingApi, bookingPayload, editedBookingPayload }) => {
    //create booking
    const createResp = await bookingApi.PostBooking(bookingPayload);
    expect(createResp.status, createResp.text).toBe(200);
    expect(createResp.body).not.toBeNull();
    id = createResp.body!.bookingid

    //update booking with invalid auth token
    await bookingApi.setAuth('5757474476')
    const updateResp = await bookingApi.UpdateBooking(id, editedBookingPayload)
    expect(updateResp.status).toBe(403);

    //get booking
    const getResp = await bookingApi.GetBooking(id);
    expect(getResp.status, getResp.text).toBe(200);
    expect(getResp.body).not.toMatchObject(editedBookingPayload)
    expect(getResp.body).toMatchObject(bookingPayload)

  });

  apiTest('UPDATE Bookings with valid auth', async ({authApi, authPayload, bookingApi, bookingPayload, editedBookingPayload }) => {
    const authResp = await authApi.postAuth(authPayload)
    expect(authResp.status, authResp.text).toBe(200);
    token = authResp.body.token;

    //create booking
    bookingApi.setAuth(token);
    const createResp = await bookingApi.PostBooking(bookingPayload);
    expect(createResp.status, createResp.text).toBe(200);
    expect(createResp.body).not.toBeNull();
    id = createResp.body!.bookingid

    //update booking with valid auth token
    const updateResp = await bookingApi.UpdateBooking(id, editedBookingPayload)
    expect(updateResp.status).toBe(200);

    //get booking
    const getResp = await bookingApi.GetBooking(id);
    expect(getResp.status, getResp.text).toBe(200);
    expect(getResp.body).not.toMatchObject(bookingPayload)
    expect(getResp.body).toMatchObject(editedBookingPayload)

  });

  
})



