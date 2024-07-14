import {prisma} from "@/utils/dbclient"
import { headers } from "next/headers";

export async function GET(req: Request) {

     const header = headers().get("Authorisation")
    try {

      const { email } = await req.json();

      if (!email) {
        return new Response(
          JSON.stringify({ error: "Invalid request: 'id' is required" }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const counselor = await prisma.councelors.findUnique({ where: { email } });
  
      if (!counselor) {
        return new Response(
          JSON.stringify({ error: "Counselor not found" }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return new Response(JSON.stringify(counselor), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  