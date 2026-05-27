import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullname, email, phone, message } = body;
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0] || "unknown";
  const ip_Data = (await (
    await fetch(`http://ip-api.com/json/${ip}`)
  ).json()) as {
    country: string;
    regionName: string;
    countryCode: string;
    region: string;
  };
  const { error } = await supabase.from("contact_messages").insert([
    {
      fullname,
      email,
      phone,
      message,
      action_status: "new",
      is_readed: false,
      ip_address: {
        ip,
        country: ip_Data.country,
        countryCode: ip_Data.countryCode,
        region: ip_Data.region,
        regionName: ip_Data.regionName,
      },
    },
  ]);

  if (error) {
    console.error("[SUPABASE INSERT ERROR]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Message sent successfully." },
    { status: 200 }
  );
}


