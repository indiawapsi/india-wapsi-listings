"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

export default function EldercarePage() {
  type Ad = {
    id: number;
    title: string;
    category: string;
    description: string;
    location: string;
    price: string;
    imageurl: string;
  };
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      try {
        const response = await fetch('/api/ads?category=Eldercare');
        if (!response.ok) throw new Error('Failed to fetch ads');
        const data = await response.json();
        setAds(Array.isArray(data) ? data : []);
      } catch (e) {
        setAds([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAds();
  }, []);

  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Eldercare</h1>
      <p className="text-gray-700 mb-6">
        We provide comprehensive eldercare services to ensure the well-being and comfort of your loved ones in India. From healthcare assistance to companionship, we connect you with trusted caregivers and facilities.
      </p>
      <div className="mt-8">
        {loading ? (
          <p className="text-black">Loading ads...</p>
        ) : ads.length === 0 ? (
          <p className="text-black">No eldercare ads found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">{ad.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-black mb-3">
                    <div className="flex items-center gap-1">
                      <FaBriefcase className="text-green-500" />
                      <span>{ad.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span>{ad.location}</span>
                    </div>
                  </div>
                  <p className="text-black text-sm mb-4 line-clamp-3">{ad.description}</p>
                  <Link href={`/ads/${ad.id}`} className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}