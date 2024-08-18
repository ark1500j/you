import { NextResponse } from "next/server" 
 
const allowedOrigins = process.env.NODE_ENV ==='production' 
?["https://www.mysite.com","https://mysite.com"]:["http://localhost:3000", "https://www.google.com","https://platform.openai.com/"] 
 
export function middleware(request:Request){ 
    const origin =request.headers.get('origin') 
    console.log(origin && !allowedOrigins.includes(origin))
//   add to condition if you want to block rest client or postman ||!origin 
    // if(origin && !allowedOrigins.includes(origin)) return new NextResponse(null,{ 
    //     status:400, 
    //     statusText:"bad request", 
    //     headers:{ 
    //         'Content-Type':'text/plain' 
    //     } 
    // }) 
    // // console.log(origin) 
    // console.log("Middleware") 
    // console.log(request.method) 
    // console.log(request.url) 
    
 
    return  NextResponse.next(); 
} 
 
 
export const config={ 
    matcher:'/api/:path*' 
}