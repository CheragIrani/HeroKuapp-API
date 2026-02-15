export interface PostBookingResponse{

    bookingid: number,
    booking: {
      firstname: string,
      lastname: string,
      totalprice: number,
      depositpaid: boolean,
      bookingdates: 
        { 
            checkin: string, 
            checkout: string 
        },
      additionalneeds: string
    }
}

export interface GetBookingResponse{

    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: 
        { checkin: string, 
            checkout: string 
        },
    additionalneeds: string
}