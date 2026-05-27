import AdminSettings from "@/components/admin/adminSettings";
import AdminUsersDashboard from "@/components/admin/adminUser";
import ChangePassword from "@/components/admin/changepassword";
import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabaseServar";
import React from "react";

export default async function page() {
  const supabaseServar = await createClient();
  const { data } = await supabase.from("admin_dashboard").select("*");
  const { data: userData } = await supabaseServar.auth.admin.listUsers();
  const { data: user } = await supabaseServar.auth.getUser();

  const usersData = userData.users.filter((data) => data.id !== user.user?.id);

  return (
    <>
      <div className="px-4">

        <AdminSettings inistalData={data![0]} />
        <ChangePassword />
        {user.user?.user_metadata.role === "Super Admin" && (
        <AdminUsersDashboard userData={usersData} />
        )}
      </div>
    </>
  );
}
