// pages/api/services/updateService.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Image } from "@/types/type";

export async function POST(req: Request) {
  const formData = await req.formData();

  try {
    // 1) Parse required fields
    const idRaw = formData.get("id");

    if (!idRaw) throw new Error("Missing service ID");

    const serviceId = Number(idRaw);

    if (isNaN(serviceId)) throw new Error("Invalid service ID");

    const service_name = formData.get("service_name") as string;

    const description = formData.get("description") as string;

    const raw_updatedSub_services = formData.get(
      "updatedSub_services"
    ) as string;
    const updatedSub_services = JSON.parse(raw_updatedSub_services) as [
      { sub_service_name: string; features: string[]; image: Image }
    ];

    const cover_image = JSON.parse(
      formData.get("cover_image") as string
    ) as Image;

    const old_cover_image_path = formData.get("old_cover_image_path") as string;

    const images = JSON.parse(
      formData.get("existing_images") as string
    ) as unknown as [{ path: string; image_url: string }];
    const remove_images = formData.getAll("remove_images[]") as string[];
    const remove_subServices = formData.getAll("removeSubServices[]");

    if (remove_subServices.length > 0) {
      const { data, error } = await supabase
        .from("sub_services")
        .delete()
        .in("id", remove_subServices);

      console.log(data, error);
    }

    if (remove_images.length > 0) {
      supabase.storage.from("static.images").remove(remove_images);
    }

    // for (const image of new_images) {
    //   const buffer = Buffer.from(await image.arrayBuffer());
    //   const path = `service/${service_name}/${Date.now()}-${image.name}`;

    //   await supabase.storage.from("static.images").upload(path, buffer, {
    //     contentType: image.type,
    //   });
    //   const { data: urlData } = supabase.storage
    //     .from("static.images")
    //     .getPublicUrl(path);

    //   uploadedImagesObjects.push({ path, image_url: urlData.publicUrl });
    // }
    console.log("remove_subServices", remove_subServices);

    if (!service_name) throw new Error("serviceName is required");
    if (!description) throw new Error("description is required");

    if (old_cover_image_path) {
      const { error } = await supabase.storage
        .from("static.images")
        .remove([old_cover_image_path]);
      if (error) throw new Error(error.message);
    }
    // if (cover_image instanceof File) {
    //   if (!old_cover_image_path)
    //     throw new Error("old_cover_image_path is required");

    //   const { error } = await supabase.storage
    //     .from("static.images")
    //     .remove([old_cover_image_path]);

    //   if (error) throw new Error(error.message);
    // } else {
    //   const { data: urlData } = supabase.storage
    //     .from("static.images")
    //     .getPublicUrl(cover_image);
    //   coverImage = { path: cover_image, image_url: urlData.publicUrl };
    // }

    await supabase
      .from("services")
      .update([
        {
          service_name,
          description,
          cover_image,
          images,
        },
      ])
      .eq("id", idRaw);

    console.log(updatedSub_services);
    updatedSub_services.forEach(async (sub) => {
      // @ts-expect-error : ignore
      if (sub.id) {
        // @ts-expect-error : ignore
        await supabase.from("sub_services").update(sub).eq("id", sub.id);
      } else {
        const subServicePayload = [
          {
            sub_service_name: sub.sub_service_name,
            service_id: idRaw,

            features: sub.features || [],
            image: sub.image,
          },
        ];

        await supabase.from("sub_services").insert(subServicePayload);
      }
    });

    return NextResponse.json(
      { message: "Service updated successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[SERVICE UPDATE ERROR]", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
