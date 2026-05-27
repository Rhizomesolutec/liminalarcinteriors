import MessageAdminPanel from "@/components/admin/messageclint";
import { supabase } from "@/lib/supabaseClient";
import React from "react";

export default async function page() {
  const { data, } = await supabase
    .from("contact_messages")
    .select("*")
    .order("submitted_at", { ascending: false });

    console.log(data)
  return (
    <>
      <MessageAdminPanel inistalData={data!} />
    </>
  );
}
