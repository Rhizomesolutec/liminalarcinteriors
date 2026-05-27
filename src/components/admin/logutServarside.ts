"use server";
import { createClient } from "@/lib/supabaseServar";


export const handleLogout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  return error;
};
