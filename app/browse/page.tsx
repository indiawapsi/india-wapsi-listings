"use client";

import Link from "next/link";
import ads from "@/app/data/ads"; 

export default function BrowseAds() {
  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4 text-center text-fuchsia-500">Browse Ads</h1>
      <div className="grid gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-black">{ad.title}</h2>
            <p className="text-sm text-gray-600">
              {ad.category} | {ad.location}
            </p>
            <p className="mt-2 text-emerald-400">{ad.description}</p>
            <Link href={`/ads/${ad.id}`} className="text-blue-600 mt-3 inline-block">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
