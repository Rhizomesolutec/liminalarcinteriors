import AdminDashboardClint from "@/components/admin/adminDashboardClint";
import { createClient } from "@/lib/supabaseServar";
import React from "react";

export default async function page() {
  // const { data } = await supabase.from("admin_dashboard").select("*");
  const supabaseServar = await createClient();
  const { data: user } = await supabaseServar.auth.getUser();

  return (
    <div>
      <AdminDashboardClint
        inistalData={{
          user: user.user!,
        }}
      />
    </div>
  );
}
