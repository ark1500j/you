import { prisma } from "@/utils/dbclient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("api working");
  const origin = req.headers.get("origin");
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid request: 'id' is required" }),
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
    console.log(counselor)
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
      statusText:"not working",
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "application/json",
      },
    });
  }
}
