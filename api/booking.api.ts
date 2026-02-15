import { APIRequestContext } from "@playwright/test";
import { BookingPayload } from "../data/booking.payload";
import { PostBookingResponse, GetBookingResponse } from "../data/booking.response";

export class BookingApi{
    readonly request: APIRequestContext
    token?: string

    constructor(request: APIRequestContext ){
        this.request = request
    }

    setAuth(token: string){
        this.token = token
    }

    async PostBooking(bookingPayload: BookingPayload) {
        const resp = await this.request.post('/booking', {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              data: bookingPayload
            })
        
            const status = resp.status();
            const text = await resp.text();
            let body: PostBookingResponse | null = null
            try{ body = text ? JSON.parse(text) as PostBookingResponse: null }
            catch{body = null}
            
            console.log(body)

            return {status, text, body}

    }

    async UpdateBooking(id: number, bookingPayload: BookingPayload) {
        const resp = await this.request.put(`/booking/${id}`, {
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `token=${this.token}`
              },
              data: bookingPayload
            })
        
            const status = resp.status();
            const text = await resp.text();
            let body
            try { body = JSON.parse(text) as PostBookingResponse }
                catch{ 
                    body = null}
            
            console.log(body)

            return {status, text, body}

    }

    async GetBooking(id: number): Promise<{status: number, text: string, body: GetBookingResponse | null}> {
        const resp = await this.request.get(`/booking/${id}`, {
            headers: {
              "Accept": "application/json"
            },
        })
        
        const status = resp.status();
        const text = await resp.text();
        const body = text ? JSON.parse(text) as GetBookingResponse: null
        
        return {status, text, body}

    }

    async GetBookings(): Promise<{status: number, text: string, body: {bookingid: number}[] | null}> {
        const resp = await this.request.get('/booking', {
            headers: {
              "Accept": "application/json"
            },
        })
        
        const status = resp.status();
        const text = await resp.text();
        const body = text ? JSON.parse(text) as {bookingid: number}[]: null
        
        return {status, text, body}

    }

    async DeleteBooking(id: number): Promise<{status: number, text: string, body: GetBookingResponse | null}> {
        const resp = await this.request.delete(`/booking/${id}`, {
            headers: {
              "Accept": "application/json",
              "Cookie": `token=${this.token}`

            },
        })
        
        const status = resp.status();
        const text = await resp.text();
        let body
        try{
            body = text ? JSON.parse(text): null

        }catch{
            body = null
        }
        
        return {status, text, body}

    }
}