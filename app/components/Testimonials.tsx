"use client";
import { useEffect, useRef } from "react";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    let  scrollPosition = 0;

    const interval = setInterval(() => {
      if (container) {
        const cardWidth = container.children[0].clientWidth + 24; 
         const maxScrollLeft = container.scrollWidth - container.clientWidth;
        scrollPosition += cardWidth;

        if (container.scrollLeft + cardWidth >= maxScrollLeft) {
           container.scrollTo({ left: 0, behavior: "smooth" });
        }
        else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }

        
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gray-100 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <h2 className="text-xl sm:text-3xl font-bold text-center text-black mb-8 sm:mb-10">
          What NRIs Say About India Wapsi
        </h2>

        <div
          ref={scrollRef}
          className="flex flex-col sm:flex-row overflow-x-auto sm:space-x-6 space-y-6 sm:space-y-0 snap-x snap-mandatory px-1 scroll-smooth hide-scrollbar"
        >
      {/* Card 1 */}
      <div className="min-w-0 sm:min-w-[300px] sm:max-w-[350px] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          I was overwhelmed with the thought of moving back to India. India Wapsi made the transition incredibly smooth, especially with housing support.
        </p>
        <div className="text-xs sm:text-sm font-semibold text-green-600">
          – Rajeev G., Returned from Canada
        </div>
      </div>
      {/* Card 2 */}
      <div className="min-w-0 sm:min-w-[300px] sm:max-w-[350px] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          I needed urgent eldercare solutions for my parents. The resources on India Wapsi saved me hours of research and gave me peace of mind.
        </p>
        <div className="text-xs sm:text-sm font-semibold text-green-600">
          – Priya S., NRI in the US
        </div>
      </div>
      {/* Card 3 */}
      <div className="min-w-0 sm:min-w-[300px] sm:max-w-[350px] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Navigating school admissions from abroad was overwhelming. India Wapsi’s curated education resources helped me find the right international school for my kids with ease.
        </p>
        <div className="text-xs sm:text-sm font-semibold text-green-600">
          – Arjun M., NRI in the UK
        </div>
      </div>
      {/* Card 4 */}
      <div className="min-w-0 sm:min-w-[300px] sm:max-w-[350px] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          I was confused about NRI tax rules and investment options in India. India Wapsi made it easy to understand and connect with reliable financial advisors.
        </p>
        <div className="text-xs sm:text-sm font-semibold text-green-600">
          – Neha R., NRI in Canada
        </div>
      </div>
      {/* Card 5 */}
      <div className="min-w-0 sm:min-w-[300px] sm:max-w-[350px] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Moving back to India meant restarting my career. Thanks to India Wapsi’s employment resources, I found a remote job before I even landed.
        </p>
        <div className="text-xs sm:text-sm font-semibold text-green-600">
          – Rohit T., NRI returning from Australia
        </div>
      </div>
      {/* Card 6 */}
      <div className="min-w-0 sm:min-w-[300px] sm:max-w-[350px] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-6 snap-start shadow-sm">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          I wanted to outsource customer support to India but didn’t know where to start. India Wapsi connected me with vetted partners and simplified the whole process.
        </p>
        <div className="text-xs sm:text-sm font-semibold text-green-600">
          – Ayesha K., Entrepreneur in Dubai
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
