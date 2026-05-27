import DashboardNavbar from "@/components/admin/navbar";
import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabaseServar";
import { ThemeProvider } from "next-themes";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseServer = await createClient();

  const { count, error } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_readed", false);

  if (error) {
    console.error("Supabase error:", error.message);
  }
  const { data, error: er } = await supabaseServer.auth.getUser();

  if (er || !data?.user) {
    redirect("/admin/login");
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen  bg-gradient-to-br from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]  text-white">
        <DashboardNavbar
          initialData={{ count: count ?? 0 }}
        />
        {children}
      </div>
    </ThemeProvider>
  );
}
