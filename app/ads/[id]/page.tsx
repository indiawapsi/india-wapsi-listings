"use client";

import { useParams, useRouter } from "next/navigation";
import ads from "@/app/data/ads";
import Link from "next/link";
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

export default function AdDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const ad = ads.find((ad) => ad.id === id);

  if (!ad) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-black mb-4">Ad Not Found</h1>
        <p className="text-black mb-6">The ad you are looking for does not exist.</p>
        <Link href="/browse" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-base">
          <FaArrowLeft className="mr-2" /> Back to Browse Ads
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <Link href="/browse" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-base mb-6">
          <FaArrowLeft className="mr-2" /> Back to Browse Ads
        </Link>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {ad.imageUrl && (
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          )}
          <h1 className="text-3xl font-bold text-black mb-2">{ad.title}</h1>
          <div className="text-xl font-semibold text-green-700 mb-4">{ad.price}</div>
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-black">
              <FaBriefcase className="text-green-500" />
              <span>{ad.category}</span>
            </div>
            <div className="flex items-center gap-2 text-black">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{ad.location}</span>
            </div>
          </div>
          <p className="text-black text-lg mb-6">{ad.description}</p>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-bold text-black mb-2">Contact Information</h2>
            <div className="text-black mb-1"><span className="font-semibold">Name:</span> {ad.contactName}</div>
            <div className="text-black mb-1"><span className="font-semibold">Email:</span> <a href={`mailto:${ad.contactEmail}`} className="text-green-700 underline">{ad.contactEmail}</a></div>
            <div className="text-black mb-1"><span className="font-semibold">Phone:</span> <a href={`tel:${ad.contactPhone}`} className="text-green-700 underline">{ad.contactPhone}</a></div>
          </div>
        </div>
      </div>
    </div>
  );
} 