import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { landingPageNumber, whatsappNumber } = (await req.json()) as {
    landingPageNumber?: string;
    whatsappNumber?: string;
  };

  if (!landingPageNumber || !whatsappNumber)
    return NextResponse.json("landingPageNumber whatsappNumber not found", {
      status: 500,
    });

  if (landingPageNumber && whatsappNumber) {
   const {data,error}= await supabase
      .from("admin_dashboard")
      .update({
        phone_number: landingPageNumber,
        whatsApp_number: whatsappNumber,
      }).eq("id",1)
      console.log(data,error)
    return NextResponse.json("updated phone number and whatsApp number ", {
      status: 200,
    });
  }
}
