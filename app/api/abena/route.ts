import { prisma } from "@/utils/dbclient";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.google.com",
  "https://your-production-site.com",
];
function validateApiKey(req: NextRequest): boolean {
  const apikey = req.headers.get("API-KEY");
  return apikey === process.env.API_KEY;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  console.log(origin);
  
    if (!validateApiKey(req)) {
      return new NextResponse(JSON.stringify({ error: "Invalid API key" }), {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse("Origin not allowed", {
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
      },
    });
  }

  try {
    const { email } = await req.json();
    console.log(email);

    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid request: 'email' is required" }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
          },
        }
      );
    }

    const counselor = await prisma.councelors.findUnique({
      where: { email },
      include: { students: true },
    });

    if (!counselor) {
      return new NextResponse(JSON.stringify({ error: "Counselor not found" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      });
    }
    console.log(counselor);
    return new NextResponse(JSON.stringify(counselor), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    });
  } else {
    return new NextResponse(null, {
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
