"use client";
import Link from "next/link";
import { FaHome, FaBriefcase, FaHeart, FaBook, FaDollarSign, FaBuilding } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="flex flex-col items-start max-w-3xl mt-16 px-8 ml-0 sm:ml-16">
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
        <Link href="/post" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow">
          Post an Ad
        </Link>
      </section>
      {/* Testimonials Section */}
<section className="w-full bg-gray-100 py-16">
  <div className="max-w-5xl mx-auto px-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-10">
      What NRIs Say About India Wapsi
    </h2>

    <div className="flex overflow-x-auto space-x-6 snap-x snap-mandatory px-1 scroll-smooth hide-scrollbar">
      {/* Card 1 */}
      <div className="min-w-[300px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4">
          I was overwhelmed with the thought of moving back to India. India Wapsi made the transition incredibly smooth, especially with housing support.
        </p>
        <div className="text-sm font-semibold text-green-600">
          – Rajeev G., Returned from Canada
        </div>
      </div>

      {/* Card 2 */}
      <div className="min-w-[300px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4">
          I needed urgent eldercare solutions for my parents. The resources on India Wapsi saved me hours of research and gave me peace of mind.
        </p>
        <div className="text-sm font-semibold text-green-600">
          – Priya S., NRI in the US
        </div>
      </div>

       {/* Card 3 */}
     <div className="min-w-[300px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl p-6 snap-start shadow-sm">
  <p className="text-gray-700 mb-4">
    Navigating school admissions from abroad was overwhelming. India Wapsi’s curated education resources helped me find the right international school for my kids with ease.
  </p>
  <div className="text-sm font-semibold text-green-600">
    – Arjun M., NRI in the UK
  </div>
</div>
  {/* Card 4 */}
<div className="min-w-[300px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl p-6 snap-start shadow-sm">
  <p className="text-gray-700 mb-4">
    I was confused about NRI tax rules and investment options in India. India Wapsi made it easy to understand and connect with reliable financial advisors.
  </p>
  <div className="text-sm font-semibold text-green-600">
    – Neha R., NRI in Canada
  </div>
</div>
  {/* Card 5 */}
<div className="min-w-[300px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl p-6 snap-start shadow-sm">
  <p className="text-gray-700 mb-4">
    Moving back to India meant restarting my career. Thanks to India Wapsi’s employment resources, I found a remote job before I even landed.
  </p>
  <div className="text-sm font-semibold text-green-600">
    – Rohit T., NRI returning from Australia
  </div>
</div>
  {/* Card 6 */}
<div className="min-w-[300px] sm:min-w-[350px] bg-white border border-gray-200 rounded-xl p-6 snap-start shadow-sm">
  <p className="text-gray-700 mb-4">
    I wanted to outsource customer support to India but didn’t know where to start. India Wapsi connected me with vetted partners and simplified the whole process.
  </p>
  <div className="text-sm font-semibold text-green-600">
    – Ayesha K., Entrepreneur in Dubai
  </div>
</div>

    </div>
  </div>
</section>

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
