"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const categories = [
  "Property and Housing",
  "Employment",
  "Eldercare",
  "Education",
  "Finances",
  "Business Outsourcing",
];

export default function EditAdPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    price: "",
    imageurl: "",
  });
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
          setForm(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchAd();
    }
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to update ad');
      }

      router.push(`/ads/${id}`);
    } catch (error) {
      console.error(error);
      alert('Failed to update ad.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black">Loading ad...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <Link href={`/ads/${id}`} className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-base mb-6">
          <FaArrowLeft className="mr-2" /> Back to Ad Details
        </Link>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 w-full">
          <h1 className="text-2xl font-bold text-black mb-6">Edit Ad</h1>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black font-medium mb-1">Price</label>
            <input name="price" value={form.price} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
          </div>
          <div className="mb-6">
            <label className="block text-black font-medium mb-1">Image URL</label>
            <input name="imageurl" value={form.imageurl} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">Save Changes</button>
        </form>
      </div>
    </div>
  );
}