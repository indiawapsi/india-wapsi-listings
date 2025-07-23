"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

type Ad = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  price: string;
  imageurl: string;
};

export default function AdDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const firstInputRef = useRef(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportFeedback, setReportFeedback] = useState("");
  const [reportSending, setReportSending] = useState(false);
  const MODERATOR_EMAILS = ["agnibhananda@gmail.com", "indiawapsi4@gmail.com"];

  useEffect(() => {
    if (id) {
      async function fetchAd() {
        try {
          const response = await fetch(`/api/ads/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch ad');
          }
          const data = await response.json();
          setAd(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchAd();
    }
  }, [id]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setForm(f => ({ ...f, name: user.firstName || "", email: user.primaryEmailAddress?.emailAddress || "" }));
    }
  }, [isLoaded, isSignedIn, user]);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ad) return;
    setSending(true);
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adId: ad.id, ...form }),
      });
      if (res.ok) {
        setFeedback("Your inquiry has been sent! We'll get back to you soon.");
        setForm(f => ({ ...f, message: "" }));
      } else {
        setFeedback("Failed to send. Please try again later.");
      }
    } catch {
      setFeedback("Failed to send. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        const response = await fetch(`/api/ads/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete ad');
        }
        router.push('/browse');
      } catch (error) {
        console.error(error);
        alert('Failed to delete ad.');
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black">Loading ad...</p>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-black mb-4">Ad Not Found</h1>
        <p className="text-black mb-6">The ad you are looking for does not exist.</p>
        <Link href="/browse" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-base">
          <FaArrowLeft className="mr-2" /> Back to Browse Ads
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-2 sm:p-6">
        <Link href="/browse" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-base mb-6">
          <FaArrowLeft className="mr-2" /> Back to Browse Ads
        </Link>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8">
          <div className="flex justify-end gap-3 mb-4">
            {isLoaded && isSignedIn &&
              typeof user?.primaryEmailAddress?.emailAddress === 'string' &&
              MODERATOR_EMAILS.includes(user.primaryEmailAddress.emailAddress) && (
              <>
                <Link href={`/ads/${ad.id}/edit`} className="inline-flex items-center text-blue-600 hover:text-blue-700">
                  <FaEdit className="mr-1" /> Edit
                </Link>
                <button onClick={handleDelete} className="inline-flex items-center text-red-600 hover:text-red-700">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </>
            )}
          </div>
          {ad.imageurl && (
            <img src={ad.imageurl} alt={ad.title} className="w-full h-48 sm:h-64 object-cover rounded-lg mb-6" />
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">{ad.title}</h1>
          <div className="text-lg sm:text-xl font-semibold text-green-700 mb-4">{ad.price}</div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-4">
            <div className="flex items-center gap-2 text-black">
              <FaBriefcase className="text-green-500" />
              <span>{ad.category}</span>
            </div>
            <div className="flex items-center gap-2 text-black">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{ad.location}</span>
            </div>
          </div>
          <p className="text-black text-base sm:text-lg">{ad.description}</p>
          {/* CTA Button */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow text-lg"
              onClick={() => setShowModal(true)}
            >
              Interested? Contact us
            </button>
            <button
              className="text-xs text-red-600 hover:underline mt-2"
              onClick={() => setShowReportModal(true)}
            >
              Report this ad
            </button>
          </div>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 px-1 sm:px-2">
              <div className="bg-white rounded-lg shadow-lg p-2 sm:p-8 w-full max-w-xs sm:max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => { setShowModal(false); setFeedback(""); }}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-base sm:text-2xl font-bold mb-4 text-green-700">Contact About This Ad</h2>
                <form onSubmit={handleContactSubmit} className="space-y-2 sm:space-y-4">
                  <div>
                    <label className="block text-black font-medium mb-1">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                      ref={firstInputRef}
                    />
                  </div>
                  <div>
                    <label className="block text-black font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black font-medium mb-1">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Inquiry"}
                  </button>
                  {feedback && <div className="mt-2 text-center text-green-700">{feedback}</div>}
                </form>
              </div>
            </div>
          )}
          {/* Report Modal */}
          {showReportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 px-1 sm:px-2">
              <div className="bg-white rounded-lg shadow-lg p-2 sm:p-8 w-full max-w-xs sm:max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={() => { setShowReportModal(false); setReportFeedback(""); setReportReason(""); }}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-base sm:text-2xl font-bold mb-4 text-red-700">Report This Ad</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setReportSending(true);
                    setReportFeedback("");
                    try {
                      const res = await fetch("/api/report", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ adId: ad.id, reason: reportReason }),
                      });
                      if (res.ok) {
                        setReportFeedback("Thank you for your report. We'll review this ad soon.");
                        setReportReason("");
                      } else {
                        setReportFeedback("Failed to send report. Please try again later.");
                      }
                    } catch {
                      setReportFeedback("Failed to send report. Please try again later.");
                    } finally {
                      setReportSending(false);
                    }
                  }}
                  className="space-y-2 sm:space-y-4"
                >
                  <div>
                    <label className="block text-black font-medium mb-1 text-sm">Reason</label>
                    <textarea
                      value={reportReason}
                      onChange={e => setReportReason(e.target.value)}
                      required
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black text-sm"
                      placeholder="Describe the issue with this ad..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded text-sm"
                    disabled={reportSending}
                  >
                    {reportSending ? "Reporting..." : "Submit Report"}
                  </button>
                  {reportFeedback && <div className="mt-2 text-center text-green-700">{reportFeedback}</div>}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}