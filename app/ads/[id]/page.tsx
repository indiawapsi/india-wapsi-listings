"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";

type Ad = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  price: string;
  imageurl: string;
};

export default function AdDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function fetchAd() {
        try {
          const response = await fetch(`/api/ads/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch ad');
          }
          const data = await response.json();
          setAd(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchAd();
    }
  }, [id]);

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        const response = await fetch(`/api/ads/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete ad');
        }
        router.push('/browse');
      } catch (error) {
        console.error(error);
        alert('Failed to delete ad.');
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black">Loading ad...</p>
      </div>
    );
  }

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
          <div className="flex justify-end gap-3 mb-4">
            <Link href={`/ads/${ad.id}/edit`} className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <FaEdit className="mr-1" /> Edit
            </Link>
            <button onClick={handleDelete} className="inline-flex items-center text-red-600 hover:text-red-700">
              <FaTrash className="mr-1" /> Delete
            </button>
          </div>
          {ad.imageurl && (
            <img src={ad.imageurl} alt={ad.title} className="w-full h-64 object-cover rounded-lg mb-6" />
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
          <p className="text-black text-lg">{ad.description}</p>
        </div>
      </div>
    </div>
  );
}