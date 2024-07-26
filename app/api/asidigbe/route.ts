import { NextRequest, NextResponse } from "next/server"



export async function GET(req:NextRequest) {
     const origin= req.headers.get("origin")
     console.log("api is working")
     console.log(origin)
     // const data = await req.json()
     console.log("hello worlds")
     return new NextResponse(JSON.stringify({hello:'hello'}), {
          status: 200,
          statusText:"not working",
          headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
          },
     })
}