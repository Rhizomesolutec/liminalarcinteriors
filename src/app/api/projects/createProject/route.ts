import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Image } from "@/types/type";
export async function POST(req: Request) {
  const formData = await req.formData();

  try {
    // const mainImage = formData.get("main_image") as File;
    // console.log(mainImage);
    // const buffer = Buffer.from(await mainImage.arrayBuffer());

    // const path = `projects/${formData.get("title")}/${Date.now()}-${
    //   mainImage.name
    // }`;

    // await supabase.storage.from("static.images").upload(path, buffer, {
    //   contentType: mainImage.type,
    // });
    const testimonial = {
      quote: formData.get("testimonial_quote") as string,
      author: formData.get("testimonial_author") as string,
      role: formData.get("testimonial_role") as string,
    };

    // const { data: image_url } = supabase.storage
    //   .from("static.images")
    //   .getPublicUrl(path);

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .insert([
        {
          title: formData.get("title") as string,
          location: formData.get("location") as string,
          category: formData.get("category") as string,
          status: formData.get("status") as string,
          area: formData.get("area") as string,
          rooms: formData.get("rooms") as string,
          year: Number(formData.get("year")),
          description: formData.get("description") as string,
          main_image: JSON.parse(formData.get("main_image") as string),
          showOnLanding: formData.get("showOnLanding") === "true",
          project_features: (formData.getAll("features[]") as string[]) || [],
          project_materials: (formData.getAll("materials[]") as string[]) || [],
          project_testimonials: testimonial,
        },
      ])
      .select();

    if (projectError || !projectData || projectData.length === 0) {
      throw new Error(projectError?.message || "Project insert failed");
    }

    const projectId = projectData[0].id;

    const images = JSON.parse(formData.get("images") as string) as Image[];
    // const uploadedUrls = [];
    console.log("images", images);
    // try {
    //   for (const image of images) {
    //     const buffer = Buffer.from(await image.arrayBuffer());
    //     const path = `projects/${formData.get("title")}/${Date.now()}-${
    //       image.name
    //     }`;

    //     const uploadResult = await supabase.storage
    //       .from("static.images")
    //       .upload(path, buffer, {
    //         contentType: image.type,
    //       });
    //     console.log("Upload result:", uploadResult);

    //     const { data: urlData } = supabase.storage
    //       .from("static.images")
    //       .getPublicUrl(path);

    //     uploadedUrls.push({ path, image_url: urlData.publicUrl });
    //   }
    // } catch (error) {
    //   console.log("errr---", error);
    // }

    // console.log(uploadedUrls);
    const galleryInsertPromise =
      images.length > 0
        ? supabase.from("project_gallery").insert(
            images.map((imageUrls) => ({
              project_id: projectId,
              image_url: {
                path: imageUrls.path,
                image_url: imageUrls.image_url,
              },
            }))
          )
        : null;

    // // Wait for all inserts
    await Promise.all([galleryInsertPromise].filter(Boolean));

    return NextResponse.json(
      { message: "Project and related data inserted successfully.", projectId },
      { status: 200 }
    );
  } catch (error) {
    // console.error("[SUPABASE INSERT ERROR]", error?.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
