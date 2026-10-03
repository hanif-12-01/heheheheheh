import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Journey } from "@/components/sections/Journey";
import { PixelButton } from "@/components/pixel/PixelButton";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "The Journey — Academic & Leadership Progression | M. Hanif Al Faiz",
  description:
    "Chronological semester level progression of M. Hanif Al Faiz at Telkom University Purwokerto.",
};

export default function StandaloneJourneyPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div>
        <Link href="/">
          <PixelButton variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Spawn Point</span>
          </PixelButton>
        </Link>
      </div>

      <Journey />
    </main>
  );
}
