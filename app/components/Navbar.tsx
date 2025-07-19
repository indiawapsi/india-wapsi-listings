"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">
        <Link href="/">India Wapsi</Link>
      </h1>
      <div className="flex items-center space-x-4 text-sm text-black">
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
    </nav>
  );
}
