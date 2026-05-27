import ServiceServalcomponent from "@/components/admin/inistalComponent/serviceServalcomponent";
import { supabase } from "@/lib/supabaseClient";
import React from "react";
export default async function page() {
  const { data } = await supabase
    .from("services")
    .select("*,sub_services(*)");
  return (
    <>
      <ServiceServalcomponent inistalData={data!}  />
    </>
  );
}
