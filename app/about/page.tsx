"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black px-6 sm:px-12 py-12 max-w-5xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-green-600">
        The Pioneers in Helping Indians Return to India
      </h1>

      <p className="text-center text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-10">
        India Wapsi is an initiative by two senior executives based out of India and Canada who dream of their homeland India over long-distance calls and childhood memories.
      </p>

      {/* Story Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-semibold text-black mb-4 text-center">Our Story</h2>
        <p className="text-gray-700 text-base leading-relaxed">
        India Wapsi is an initiative by a senior executive based out of India, Anik, the founder & CEO of this venture who is arranging for the resources for NRIs and immigrants to return to India smoothly and would like to spread the message of homecoming to all those who have left India for a better life abroad.
        </p>
      </div>

      {/* Founders Section */}
      <div className="flex justify-center">
      <TeamMember
        name="Anik Biswas"
        title="Founder & CEO"
        image="/anik.png"
        linkedin="https://www.linkedin.com/in/anikbiswas"
        bio="Anik is an alumnus of UCLA Anderson and holds a degree in Computer Engineering from JIIT Noida. He brings 15+ years of leadership experience in tech companies like Aditya Birla, ShopClues, Dailyhunt, and more. He has also cofounded edtech ventures incubated by IIM Ahmedabad and UC Berkeley. Outside work, Anik enjoys writing and singing."
      />
      </div>

      {/* Team Members Section */}
      <h2 className="text-2xl font-semibold text-black mt-16 mb-6 text-center">Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex justify-center">
        <TeamMember
          name="Kul Chandra Bhatt"
          title="Founding Team Member – Engineering"
          image="/kul.jpg"
          linkedin="https://www.linkedin.com/in/kul-chandra-bhatt-b66182237/"
          bio="Kul is a software developer from Kathmandu, Nepal, and a COMPEX Scholar with a B.Tech in Computer Science and Engineering from JIIT Noida. He brings strong full-stack and front-end development skills to the India Wapsi platform, having previously interned as a React Developer and Salesforce Engineer. He is passionate about building scalable, people-first products that solve real-world problems,especially those that help make returning to India easier for the global Indian diaspora."
        />
        </div>
        <div className="flex justify-center">
        <TeamMember
          name="Agnibha Nanda"
          title="Founding Team Member – Intern"
          image="/agnibha.jpg"
          linkedin="https://www.linkedin.com/in/agnibha-nanda-2b92931b9/"
            bio="Agnibha is a CSE student at JIIT (Batch of ’28) and a full-stack developer. As a Founding Engineer at India Wapsi, he focuses on UX, SEO, and building dynamic web solutions. he brings a strong mix of technical depth and user empathy to everything he builds."
        />
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-16">
        <h3 className="text-xl font-semibold text-black mb-2">Want to connect with the India Wapsi Team?</h3>
        <Link
          href="/contact"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded shadow"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

function TeamMember({
  name,
  title,
  image,
  bio,
  linkedin,
}: {
  name: string;
  title: string;
  image: string;
  bio: string;
  linkedin?: string;
}) {
  return (
    <div className="flex flex-col gap-6 items-center bg-white border border-gray-200 p-6 sm:p-10 rounded-xl shadow-sm w-full max-w-2xl">
      <div className="min-w-[96px] min-h-[96px] w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-green-600 flex items-center justify-center bg-gray-100 mb-4 sm:mb-0 sm:mr-4">
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 text-center">
        <h3 className="text-base sm:text-lg font-bold text-black mb-2">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2">{title}</p>
        <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-2">{bio}</p>
        {linkedin && (
          <Link
            href={linkedin}
            target="_blank"
            className="inline-block mt-2 text-green-600 font-medium hover:underline text-xs sm:text-sm"
          >
            LinkedIn →
          </Link>
        )}
      </div>
    </div>
  );
}
