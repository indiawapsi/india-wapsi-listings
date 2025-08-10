"use client";
import Link from "next/link";
import { FaHome, FaBriefcase, FaHeart, FaBook, FaDollarSign, FaBuilding } from "react-icons/fa";
import Testimonials from "./components/Testimonials";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      {/* <section className="flex flex-col items-start max-w-3xl mt-16 px-8 ml-0 sm:ml-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-2 text-left">
          We are India’s first <br />
          <span className="text-green-600">concierge service<br />provider</span>
        </h1>
        <p className="text-gray-600 text-base mb-6 max-w-md text-left">
          that helps NRIs & Overseas Indians connect back or return to India.
        </p>
        <Link href="/browse" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded mt-2 shadow text-left">
          Explore Classifieds
        </Link>
      </section> */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-white py-20 px-8">
        {/* Back Button */}
        <div className="absolute left-4 top-4 z-20">
          <a
            href="https://indiawapsi.com"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-50 text-gray-700 text-sm font-medium transition"
            rel="noopener noreferrer"
          >
            ← Back to Main Website
          </a>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col gap-4 items-center">
          <Image src="/IndiaWapsi_logo.png" alt="India Wapsi Logo" width={96} height={96} className="mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight text-center">
      We’re India’s First<br />
      <span className="text-green-600">Concierge Service for NRIs</span>
    </h1>
          <p className="text-gray-600 text-lg max-w-xl text-center">
      Helping Indians abroad reconnect with their roots through property, finance, elder care, jobs & more.
    </p>
    <Link
      href="/browse"
      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow w-fit"
    >
      Browse Classifieds
    </Link>
  </div>

 
  {/* Trusted by badges */}
<div className="mt-8 flex flex-col items-center gap-4">
  <span className="text-gray-500 text-sm text-center">Trusted by:</span>
  <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-700 justify-center">
    <span className="bg-gray-100 px-3 py-1 rounded-full">Entrepreneurs</span>
    <span className="bg-gray-100 px-3 py-1 rounded-full">Tech Professionals</span>
    <span className="bg-gray-100 px-3 py-1 rounded-full">Returning NRIs</span>
  </div>
</div>

</section>


      {/* Explore Classifieds Section */}
      <section id="classifieds" className="w-full bg-gray-100 py-16 mt-20">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-2xl text-black sm:text-3xl font-bold text-center mb-2">Explore Classifieds</h2>
          <p className="text-center text-gray-600 mb-10">Find what you need in your journey back to India.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/property" className="hover:underline">
            <ClassifiedCard icon={<FaHome size={32} />} label="Property and Housing" light />
            </Link>
            <Link href="/employment" className="hover:underline">
            <ClassifiedCard icon={<FaBriefcase size={32} />} label="Employment" light />
            </Link>
            <Link href="/eldercare" className="hover:underline">
            <ClassifiedCard icon={<FaHeart size={32} />} label="Eldercare" light />
            </Link>
            <Link href="/education" className="hover:underline">
            <ClassifiedCard icon={<FaBook size={32} />} label="Education" light />
            </Link>
            <Link href="/finance" className="hover:underline">
            <ClassifiedCard icon={<FaDollarSign size={32} />} label="Finances" light />
            </Link>
            <Link href="/outsourcing" className="hover:underline">
            <ClassifiedCard icon={<FaBuilding size={32} />} label="Business Outsourcing" light />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full bg-white py-12 flex flex-col sm:flex-row items-center justify-between px-8 max-w-5xl mx-auto mt-8">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Ready to get started?</h3>
          <span className="text-green-600 font-bold text-lg">Post your ad today.</span>
        </div>
        {isSignedIn ? (
          <Link href="/post" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow">
            Post an Ad
          </Link>
        ) : (
          <Link href="/sign-in" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow">
            Sign in to Post an Ad
          </Link>
        )}
      </section>
   <Testimonials />

    </div>
  );
}

function ClassifiedCard({ icon, label, light }: { icon: React.ReactNode; label: string; light?: boolean }) {
  return (
    <div
      className={
        light
          ? "bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-10 px-4 shadow-sm hover:shadow-md hover:scale-105 transition-transform"
          : "bg-gray-900 rounded-xl flex flex-col items-center justify-center py-10 px-4 shadow hover:scale-105 transition-transform"
      }
    >
      <div className={light ? "text-green-600 mb-4" : "text-green-500 mb-4"}>{icon}</div>
      <div className={light ? "text-gray-900 font-medium text-base text-center" : "text-gray-100 font-medium text-base text-center"}>{label}</div>
    </div>
  );
}
