"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
  const { isLoaded, isSignedIn, user } = useUser();
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

  // State variables for info card visibility
  const [showGeneralTips, setShowGeneralTips] = useState(false);
  const [showCategoryInfo, setShowCategoryInfo] = useState(false);
  const [showDescriptionInfo, setShowDescriptionInfo] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [showImageURLInfo, setShowImageURLInfo] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setForm(f => ({
        ...f,
        name: user.firstName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [isLoaded, isSignedIn, user]);

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

  // Function to toggle info card visibility
  const toggleInfoCard = (cardName: string) => {
    switch (cardName) {
      case 'general':
        setShowGeneralTips(!showGeneralTips);
        break;
      case 'category':
        setShowCategoryInfo(!showCategoryInfo);
        break;
      case 'description':
        setShowDescriptionInfo(!showDescriptionInfo);
        break;
      case 'price':
        setShowPriceInfo(!showPriceInfo);
        break;
      case 'imageurl':
        setShowImageURLInfo(!showImageURLInfo);
        break;
      default:
        break;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Ad sent for Review!</h1>
          <p className="text-black mb-6">Thank you for posting your ad. It will be reviewed and published soon.</p>
          <Link href="/browse" className="text-green-600 hover:text-green-700 font-medium underline">Go to Browse Ads</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-2 sm:p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 sm:p-8 max-w-lg w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-black mb-6">Post a New Ad</h1>

        {/* Disclaimer */}
        {/* Disclaimer */}
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
          <p className="font-bold mb-2 flex items-center">
            <span className="mr-2">⚠️</span> Safety Warning
          </p>
          <p className="text-sm leading-relaxed">
            For your safety and privacy, please <strong>do not</strong> include personal contact details (such as your name, business name, phone numbers, email addresses, or physical addresses) directly in your ad description or title.
          </p>
          <p className="text-sm mt-2 leading-relaxed">
            All initial communication is handled securely through our platform to prevent spam and scams. If a client is interested, we will facilitate the connection with you directly.
          </p>
        </div>

        {/* Info Card: General */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <div className="flex items-center text-blue-700 font-semibold mb-1 cursor-pointer select-none" onClick={() => toggleInfoCard('general')}>
            Tips for a Great Ad
            <span className="ml-2">
              {showGeneralTips ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </span>
          </div>
          {showGeneralTips && (
            <ul className="list-disc list-inside text-blue-700 text-sm mt-2">
              <li>Be clear and concise in your title and description.</li>
              <li>Choose the most relevant category for your ad.</li>
              <li>Include a realistic price.</li>
              <li>Add an image URL for more visibility (optional but recommended).</li>
            </ul>
          )}
        </div>



        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          // Name is always editable
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            disabled={!!(isLoaded && isSignedIn && user)}
          />
        </div>

        {/* Info Card: Category */}
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          />
        </div>
        <div className="mb-2 p-3 bg-green-50 border-l-4 border-green-400 rounded">
          <div className="flex items-center text-green-800 text-sm font-semibold cursor-pointer select-none" onClick={() => toggleInfoCard('category')}>
            Category Info
            <span className="ml-2">
              {showCategoryInfo ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
            </span>
          </div>
          {showCategoryInfo && (
            <div className="text-green-800 text-sm mt-1">
              Select the category that best fits your ad. This helps users find your listing easily.
            </div>
          )}
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

        {/* Info Card: Description */}
        <div className="mb-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex items-center text-yellow-800 text-sm font-semibold cursor-pointer select-none" onClick={() => toggleInfoCard('description')}>
            Description Info
            <span className="ml-2">
              {showDescriptionInfo ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
            </span>
          </div>
          {showDescriptionInfo && (
            <div className="text-yellow-800 text-sm mt-1">
              Write a detailed description. Mention key features, benefits, or requirements.
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
        </div>

        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
        </div>

        {/* Info Card: Price */}
        <div className="mb-2 p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
          <div className="flex items-center text-purple-800 text-sm font-semibold cursor-pointer select-none" onClick={() => toggleInfoCard('price')}>
            Price Info
            <span className="ml-2">
              {showPriceInfo ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
            </span>
          </div>
          {showPriceInfo && (
            <div className="text-purple-800 text-sm mt-1">
              Set a fair price. If your ad is for a service, you can mention "Negotiable" if needed.
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-black font-medium mb-1">Price</label>
          <input name="price" value={form.price} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-black" />
        </div>

        {/* Info Card: Image URL */}
        <div className="mb-2 p-3 bg-pink-50 border-l-4 border-pink-400 rounded">
          <div className="flex items-center text-pink-800 text-sm font-semibold cursor-pointer select-none" onClick={() => toggleInfoCard('imageurl')}>
            Image URL Info
            <span className="ml-2">
              {showImageURLInfo ? <FaChevronUp size={13} /> : <FaChevronDown size={13} />}
            </span>
          </div>
          {showImageURLInfo && (
            <div className="text-pink-800 text-sm mt-1">
              Add a direct image URL (e.g., from Google Drive, Dropbox, or Imgur) to make your ad more attractive. This is optional but highly recommended.
            </div>
          )}
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
