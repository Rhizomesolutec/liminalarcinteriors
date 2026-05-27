import { supabase } from "@/lib/supabaseClient";
import { Image } from "@/types/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const serviceObj = JSON.parse(formData.get("services") as string);

    // const serviceArray = Object.entries(serviceObj).map(([key, value]) => ({
    //   name: key,
    //   subServices: value,
    // }));
    const coverImage = JSON.parse(formData.get("coverImages") as string) as {
      path: string;
      image_url: string;
    };
    const subServiceImages = JSON.parse(
      formData.get("subServiceImages") as string
    ) as Record<string, Image>;
    
    console.log(subServiceImages);
    // const path = `service/${formData.get("serviceName")}/${Date.now()}-${
    //   coverImage.name
    // }`;

    // const buffer = Buffer.from(await coverImage.arrayBuffer());
    // await supabase.storage
    //   .from("static.images")
    //   .upload(path, buffer, { contentType: coverImage.type });

    // const { data: image_url } = supabase.storage
    //   .from("static.images")
    //   .getPublicUrl(path);

    // const uploadedUrls = [];
    const images = JSON.parse(formData.get("images") as string) as unknown as {
      path: string;
      image_url: string;
    }[];

    // for (const image of images) {
    //   const buffer = Buffer.from(await image.arrayBuffer());
    //   const path = `service/${formData.get("serviceName")}/${Date.now()}-${
    //     image.name
    //   }`;

    //   await supabase.storage.from("static.images").upload(path, buffer, {
    //     contentType: image.type,
    //   });
    //   const { data: urlData } = supabase.storage
    //     .from("static.images")
    //     .getPublicUrl(path);

    //   uploadedUrls.push({ path, image_url: urlData.publicUrl });
    // }

    const { data: serviceData, error } = await supabase
      .from("services")
      .insert([
        {
          service_name: formData.get("serviceName"),
          description: formData.get("description"),
          cover_image: {
            path: coverImage.path,
            image_url: coverImage.image_url,
          },
          images,
        },
      ])
      .select();

    if (error) throw error;
    const serviceId = serviceData[0].id;

    const subServicePayload = Object.entries(serviceObj).map(
      ([key, value]) => ({
        image: subServiceImages[key],
        sub_service_name: key,
        service_id: serviceId,
        features: value,
      })
    );

    const { data: subServicesData, error: subInsertError } = await supabase
      .from("sub_services")
      .insert(subServicePayload);

    console.log(subServicesData);
    if (subInsertError) {
      console.error("Sub-service insert error:", subInsertError);
    }
    return NextResponse.json("", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
