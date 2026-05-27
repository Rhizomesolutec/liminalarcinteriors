import React, { JSX } from "react";
import TestimonialForm from "@/components/review";
import { supabase } from "@/lib/supabaseClient";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  
  const { id } = await params;

  
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("dynamic_link", id)
    .single();

  if (error) {
    console.error("Error fetching review:", error);
    return <div>Unable to load review data.</div>;
  }

  if (!data) {
    return <div>Review not found.</div>;
  }

  
  return <TestimonialForm data={data} />;
}
