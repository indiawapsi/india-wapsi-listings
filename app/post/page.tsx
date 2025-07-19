"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const categories = [
  "Property and Housing",
  "Employment",
  "Eldercare",
  "Education",
  "Finances",
  "Business Outsourcing",
];

export default function PostAdPage() {
  const { getToken } = useAuth();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    price: "",
    imageurl: "",
    name: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const token = await getToken();
      const response = await fetch('/api/ads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to post ad');
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Ad Posted Successfully!</h1>
          <p className="text-black mb-6">Thank you for posting your ad. It will be reviewed and published soon.</p>
          <Link href="/browse" className="text-green-600 hover:text-green-700 font-medium underline">Go to Browse Ads</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-black mb-6">Post a New Ad</h1>
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
        </div>
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
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">Post Ad</button>
      </form>
    </div>
  );
}
