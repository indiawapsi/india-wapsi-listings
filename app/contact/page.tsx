"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function ContactPage() {
  const { isLoaded, isSignedIn, user } = useUser ? useUser() : { isLoaded: false, isSignedIn: false, user: null };
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setForm(f => ({ ...f, name: user.firstName || "", email: user.primaryEmailAddress?.emailAddress || "" }));
    }
  }, [isLoaded, isSignedIn, user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, adId: "contact-page" }),
      });
      if (res.ok) {
        setFeedback("Your message has been sent! We'll get back to you soon.");
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

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-6">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
          {feedback && <div className="mt-2 text-center text-green-700">{feedback}</div>}
        </form>
      </div>
    </main>
  );
}
