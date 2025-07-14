"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        <Link href="/">India Wapsi</Link>
      </h1>
      <div className="space-x-4 text-sm text-black">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/browse" className="hover:underline">Browse Ads</Link>
        <Link href="/post" className="hover:underline">Post an Ad</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </div>
    </nav>
  );
}
