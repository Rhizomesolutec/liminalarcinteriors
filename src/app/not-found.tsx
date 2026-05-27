// app/not-found.tsx
"use client"; // if you need client-side hooks; omit if purely static

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <h1 className="text-6xl font-bold text-[#7F6456] mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! The page you’re looking for can’t be found.
      </p>
      <Link href="/">
        <Button className="px-6 py-2">Go back home</Button>
      </Link>
    </div>
  );
}
