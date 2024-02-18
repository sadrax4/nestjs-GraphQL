export class User {

    id: string
    email: string
    password?: string
    phone?: string
    cars?: string[]
    otp?:string

}

export const JWT_SECRET = "k2cy4NSbBpWQhuEwjkIG6lS";

export const GOOGLE_CLIENT_ID = "435383785262-hb1fn4tbtkck0sjqf8ar2e124bsq6tas.apps.googleusercontent.com"
export const GOOGLE_CLIENT_SECRET = "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";
export const GOOGLE_CALLBACK_URL = "http://localhost:3000/auth/google/callback";

export const SMS_API_KEY = "2f3238e0cc31c1f0c0a1c7e9c96fd695a1f1091e2ae7c6d844b81ac9083a725e" ;