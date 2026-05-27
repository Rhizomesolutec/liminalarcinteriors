import Navbar from "@/components/navbar";
import Cursor from "@/components/Cursor";
import BackToTopButton from "@/components/BackToTopButton";
import CallCpmponent from "@/components/callCpmponent";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabaseServar";
import { createFeatureFlag } from "../../../flags";


export const metadata = {
  title: "Liminal Arc Interiors & Architecture – Dubai",
  description:
    "Liminal Arc is a leading interior fit-out and architectural firm in the UAE, delivering bespoke solutions for residential, commercial, and hospitality spaces.",
  keywords: [
    "Liminal Arc",
    "Interior Design Dubai",
    "Architectural Fit-Out UAE",
    "MEP Services UAE",
    "Dubai Fit-Out Company",
    "Joinery and Carpentry",
    "Office Interior Design",
  ],
  authors: [{ name: "Liminal Arc", url: "https://www.liminalarcinteriors.com" }],
  openGraph: {
    title: "Liminal Arc Interiors & Architecture – Dubai",
    description:
      "Discover Liminal Arc’s portfolio in interior design, architecture, MEP, landscaping, and fit-out works across the UAE.",
    url: "https://www.liminalarcinteriors.com",
    siteName: "Liminal Arc",
    images: [
      {
        url: "https://vagytysnkicbwgavdcyq.supabase.co/storage/v1/object/public/static.images//logo.png",
        width: 1200,
        height: 630,
        alt: "Liminal Arc Office Fit-Out Project in Dubai",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@liminalarc",
    creator: "@liminalarc",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const enabled = await createFeatureFlag("my_feature_flag")();

  const supabaseServar = await createClient();
  const { data } = await supabaseServar.from("admin_dashboard").select("*");
  if (enabled) {
    return <h1 style={{ textAlign: "center", marginTop: "20%" }}>🚧  Site Under Maintenance. Please check back soon.</h1>
  }
  return (
    <>
      <Navbar />
      <Cursor />
      <BackToTopButton />
      <CallCpmponent data={data![0]} />
      {children}
      <Footer />
    </>
  );
}
