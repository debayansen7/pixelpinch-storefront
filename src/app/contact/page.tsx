"use client";

import { useState } from "react";
import { API_ENDPOINTS } from "../../data/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would POST to an API
    // console.log("Form submitted:", formData);

    // https://formspree.io/f/mbdwqpjv
    const data = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch(API_ENDPOINTS.FORMSPREE, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          message: "",
        }); // Clear the form
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }

    // setSubmitted(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Get in <span className="text-indigo-600">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Have feedback on PixelSqueez? Found a bug? Or just want to say hi?
            We&apos;d love to hear from you — drop us a message below.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Info Cards */}
          <div className="flex-1 space-y-6">
            {/* Quick Note Card */}
            <div className="bg-indigo-600 rounded-3xl p-8 shadow-xl shadow-indigo-600/15 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                  👋
                </div>
                <h3 className="text-xl font-bold">We&apos;re friendly!</h3>
              </div>
              <p className="text-indigo-100 leading-relaxed">
                Whether it&apos;s a feature request, a partnership idea, or just
                a quick &quot;hello&quot; — we read every single message and try
                to respond within 24 hours.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                  <p className="text-gray-600 text-sm">hello@pixelsqueez.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  ⏱️
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Response Time
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Usually within 24 hours on business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  🌍
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600 text-sm">
                    Remote-first — serving users worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="flex-1">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/50 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thanks for reaching out, {formData.name}! We&apos;ll get
                    back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-gray-800 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your feedback, report a bug, or just say hi..."
                      className="w-full bg-white/80 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-3.5 px-8 rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
