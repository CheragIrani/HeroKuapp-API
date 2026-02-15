import {test as base, expect} from '@playwright/test'
import { AuthPayload } from '../../data/auth.payload'
import { AuthApi } from '../../api/auth.api'
import { BookingPayload } from '../../data/booking.payload'
import { BookingApi } from '../../api/booking.api'
import { CreateBookingPayload } from '../../data/factories/bookingFactory.payload'

type ApiFixtures = {
    authPayload: AuthPayload
    invalidAuthPayload: AuthPayload
    bookingPayload: BookingPayload
    editedBookingPayload: BookingPayload
    authApi: AuthApi
    bookingApi: BookingApi
}

export const apiTest = base.extend<ApiFixtures>({
    authPayload: async ({}, use ) => {
        const authPayload = {
            username: "admin",
            password: "password123"
        }
        await use(authPayload)
    },
    invalidAuthPayload: async ({}, use ) => {
        const authPayload = {
            username: "admin",
            password: "password"
        }
        await use(authPayload)
    },
    bookingPayload: async({}, use) => {
        await use(CreateBookingPayload())
    },
    editedBookingPayload: async({}, use) => {
        await use(CreateBookingPayload({firstname: 'Jimmy', lastname: 'Doyle'}))
    },
    authApi: async ({ request }, use ) => {
        const authApi = new AuthApi(request);
        await use(authApi)

    },
    bookingApi: async({request}, use ) => {
        const bookingApi = new BookingApi(request)
        await use(bookingApi)
    }
})

export {expect}