import { BookingPayload } from "../booking.payload"

export function CreateBookingPayload(overrides: Partial<BookingPayload> = {}){
    let defaultBookingPayload = {
        firstname: "John",
        lastname: "Doe",
        totalprice: 123,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-02-20",
          checkout: "2026-02-23"
        },
        additionalneeds: "Breakfast"
    }
    return {
        ... defaultBookingPayload,
        ... overrides,
        bookingdates: {
            ... defaultBookingPayload.bookingdates,
            ... (overrides.bookingdates ?? {})
        }
    }
}