import LoginPage from "@/components/admin/loginCom";
import React from "react";
import { createClient } from "@/lib/supabaseServar";

import { redirect } from "next/navigation";

export default async function page() {
  const supabaseServer = await createClient();

  const { data } = await supabaseServer.auth.getUser();
  
  if (data?.user) {
    redirect("/admin/dashboard");
  }
  return <LoginPage />;
}
