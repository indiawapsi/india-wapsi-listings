"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-600">India Wapsi</span>
        </Link>
      </div>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-4 text-sm text-black">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/browse" className="hover:underline">Browse Ads</Link>
        <Link href={isSignedIn ? "/post" : "/sign-in"} className="hover:underline">Post an Ad</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/"/>
        ) : (
          <Link href="/sign-in" className="hover:underline">Sign In</Link>
        )}
      </div>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center px-2 py-1 border rounded text-black border-gray-300 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-start p-4 space-y-2 md:hidden z-50">
          <Link href="/" className="hover:underline w-full text-black" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/browse" className="hover:underline w-full text-black" onClick={() => setMenuOpen(false)}>Browse Ads</Link>
          <Link href={isSignedIn ? "/post" : "/sign-in"} className="hover:underline w-full text-black" onClick={() => setMenuOpen(false)}>Post an Ad</Link>
          <Link href="/about" className="hover:underline w-full text-black" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="hover:underline w-full text-black" onClick={() => setMenuOpen(false)}>Contact</Link>
          {isSignedIn ? (
            <div className="w-full min-w-0 max-w-xs"><UserButton afterSignOutUrl="/"/></div>
          ) : (
            <Link href="/sign-in" className="hover:underline w-full text-black" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
