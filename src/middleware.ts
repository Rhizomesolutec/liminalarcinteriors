import { updateSession } from "@/lib/supabaseMiddleware";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  
  return await updateSession(request);
}
export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
