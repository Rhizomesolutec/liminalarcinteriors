import ContactCom from '@/components/contact'
import React from 'react'
import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";

export const metadata: Metadata = {
  title: "Contact Liminal Arc | MEP & Project Management Services UAE",
  description:
    "Get in touch with Liminal Arc, one of the top MEP and project management companies in UAE. Contact us for interior design, fit-out, and joinery services in Dubai.",
  alternates: {
    canonical: "https://www.liminalarcinteriors.com/contact",
  },
};

export default async function page() {
  const { data: adminDashboard } = await supabase
    .from("admin_dashboard")
    .select("*");

  const contactPhone = adminDashboard?.[0]?.phone_number;

  return (
    <ContactCom phoneNumber={contactPhone} />
  )
}

