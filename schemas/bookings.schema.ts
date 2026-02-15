import { z } from 'zod';

export const BookingsSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    totalprice: z.number(),
    depositpaid: z.boolean(),
    bookingdates: z.object(
        { checkin: z.string(), 
            checkout: z.string() 
        }),
    additionalneeds: z.string()

})