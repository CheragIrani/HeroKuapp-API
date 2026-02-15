import { APIRequestContext, APIResponse } from "@playwright/test";
import { AuthPayload } from "../data/auth.payload";

export class AuthApi{
    readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async postAuth(authPayload: AuthPayload): Promise<{status: number, text: string, body: any}> {
        const resp = await this.request.post('/auth', {
          headers: {
            "Content-Type": "application/json"
          },
          data: authPayload
    
        })
        const status = resp.status();
        const text = await resp.text();
        const body = text ? JSON.parse(text) : null

        return {status, text, body}

    }
    

}