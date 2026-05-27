// pages/api/projects/updateProject.ts

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Image } from "@/types/type";

export async function POST(req: Request) {
  const formData = await req.formData();

  try {
    // 1) Parse “id” and all primitive fields from formData
    const id = Number(formData.get("id"));
    if (!id) {
      throw new Error("Missing or invalid project ID");
    }

    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;
    const area = formData.get("area") as string;
    const rooms = formData.get("rooms") as string;
    const year = Number(formData.get("year"));
    const description = formData.get("description") as string;
    const showOnLanding = formData.get("showOnLanding") === "true";
    const project_features =
      (formData.getAll("project_features[]") as string[]) || [];
    const project_materials =
      (formData.getAll("project_materials[]") as string[]) || [];
    const remove_images =
      (formData.getAll("remove_images[]") as string[]) || [];
    const quote = formData.get("testimonial_quote") as string | null;
    const author = formData.get("testimonial_author") as string | null;
    const role = formData.get("testimonial_role") as string | null;
    console.log(formData.get("main_image"))
    const mainImageFile = JSON.parse(
      formData.get("main_image") as string
    ) as Image;
    const old_cover_image_path = formData.get("old_cover_image_path") as string;

    if (remove_images.length > 0) {
      console.log(remove_images);
      await supabase.storage.from("static.images").remove(remove_images);
    }

    if (old_cover_image_path) {
      await supabase.storage
        .from("static.images")
        .remove([old_cover_image_path]);
    }
    // let finalMainObj: { path: string; image_url: string } | null = null;
    // if (mainImageFile && mainImageFile.size > 0) {
    //   // Upload new main image
    //   const buffer = Buffer.from(await mainImageFile.arrayBuffer());
    //   const safeFilename = `${Date.now()}-${mainImageFile.name}`;
    //   const storagePath = `projects/${title}/${safeFilename}`;

    //   const uploadResult = await supabase.storage
    //     .from("static.images")
    //     .upload(storagePath, buffer, { contentType: mainImageFile.type });

    //   if (uploadResult.error) {
    //     throw new Error(
    //       "Failed to upload new main_image: " + uploadResult.error.message
    //     );
    //   }

    //   const {
    //     data: { publicUrl },
    //   } = supabase.storage.from("static.images").getPublicUrl(storagePath);

    //   finalMainObj = { path: storagePath, image_url: publicUrl };
    // } else if (existingMainPath) {
    //   const {
    //     data: { publicUrl },
    //   } = supabase.storage.from("static.images").getPublicUrl(existingMainPath);

    //   finalMainObj = { path: existingMainPath, image_url: publicUrl };
    // } else {
    //   finalMainObj = null;
    // }

    // const existingGalleryPaths =
    //   (formData.getAll("existing_gallery_paths[]") as string[]) || [];

    const newGalleryFiles = JSON.parse(
      formData.get("new_gallery_images") as string
    ) as unknown as Image[];

    // 3.a) Upload all new Files

    // for (const file of newGalleryFiles) {
    //   if (!(file instanceof File) || file.size === 0) continue;

    //   const buffer = Buffer.from(await file.arrayBuffer());
    //   const safeFilename = `${Date.now()}-${file.name}`;
    //   const storagePath = `projects/${title}/${safeFilename}`;

    //   const uploadResult = await supabase.storage
    //     .from("static.images")
    //     .upload(storagePath, buffer, { contentType: file.type });

    //   if (uploadResult.error) {
    //     throw new Error(
    //       "Failed to upload one of the gallery images: " +
    //         uploadResult.error.message
    //     );
    //   }

    //   const {
    //     data: { publicUrl },
    //   } = supabase.storage.from("static.images").getPublicUrl(storagePath);

    //   uploadedGalleryObjects.push({ path: storagePath, image_url: publicUrl });
    // }

    // 3.b) Build a single array of all gallery paths to keep in the DB
    //      (both existing ones and newly uploaded).
    // const allGalleryEntries: Array<{
    //   project_id: number;
    //   image_url: { path: string; image_url: string };
    // }> = [];

    // // Keep existing ones:
    // for (const p of existingGalleryPaths) {
    //   // Get public URL again from storage (so the DB row can store the correct {path, image_url})
    //   const {
    //     data: { publicUrl },
    //   } = supabase.storage.from("static.images").getPublicUrl(p);

    //   allGalleryEntries.push({
    //     project_id: id,
    //     image_url: { path: p, image_url: publicUrl },
    //   });
    // }

    // Add newly uploaded ones:
    // for (const obj of newGalleryFiles) {
    //   allGalleryEntries.push({
    //     project_id: id,
    //     image_url: { path: obj.path, image_url: obj.image_url },
    //   });
    // }

    const updatePayload: Record<string, unknown> = {
      title,
      location,
      category,
      status,
      area,
      rooms,
      year,
      description,
      showOnLanding,
      project_features,
      project_materials,
      main_image: mainImageFile,
      project_testimonials: {
        quote,
        author,
        role,
      },
    };

    const { error: updateError } = await supabase
      .from("projects")
      .update(updatePayload)
      .eq("id", id);

    if (updateError) {
      throw new Error("Error updating project: " + updateError.message);
    }

    const { error: deleteGalleryError } = await supabase
      .from("project_gallery")
      .delete()
      .eq("project_id", id);
    if (deleteGalleryError) {
      throw new Error(
        "Error deleting old gallery items: " + deleteGalleryError.message
      );
    }

    if (newGalleryFiles.length > 0) {
      const { error: insertGalleryError } = await supabase
        .from("project_gallery")
        .insert(
          newGalleryFiles.map((data) => ({
            project_id: id,
            image_url: data,
          }))
        );

      if (insertGalleryError) {
        throw new Error(
          "Error inserting updated gallery items: " + insertGalleryError.message
        );
      }
    }

    return NextResponse.json(
      { message: "Project updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SUPABASE UPDATE ERROR]", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
