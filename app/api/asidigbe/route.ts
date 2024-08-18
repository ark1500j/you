import { prisma } from "@/utils/dbclient";
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://www.google.com",
  "https://your-production-site.com",
];

// Function to validate API key
function validateApiKey(req: NextRequest): boolean {
  const apikey = req.headers.get("API-KEY");
  return apikey === process.env.API_KEY;
}

export async function PUT(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!validateApiKey(req)) {
    return new NextResponse(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*" ,
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { id } = await req.json();
    const patient = await prisma.patient.update({
      where: { id },
      data: { isRead: true },
    });
    return new NextResponse(JSON.stringify(patient), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to update patient" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!validateApiKey(req)) {
    return new NextResponse(JSON.stringify({ error: "Invalid API key" }), {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { id } = await req.json();
    const patient = await prisma.patient.delete({ where: { id } });
    return new NextResponse(JSON.stringify(patient), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete patient" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization,x-api-key",
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
