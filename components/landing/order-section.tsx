"use client";

import { useState } from "react";
import { submitOrder } from "@/lib/firebase/orders";

export function OrderSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const result = await submitOrder(formData);

    if (result.success) {
      setMessage("✓ Order submitted successfully! Our team will contact you soon.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } else {
      setMessage("✗ Error submitting order. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <section id="order" className="relative py-16 lg:py-20 overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-bl from-[#6E75BF]/15 to-transparent rounded-full blur-3xl animate-blob-rotate" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#19c89a]/15 to-transparent rounded-full blur-3xl animate-blob-rotate" style={{animationDelay: '-5s'}} />
      </div>

      <div className="section-wrap relative z-10">
        <div className="relative group">
          {/* Gradient border glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6E75BF]/30 via-[#19c89a]/20 to-[#6E75BF]/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative grid gap-8 rounded-3xl border border-white/40 backdrop-blur-sm bg-gradient-to-br from-[#1f3fbf]/95 via-[#4d53dc]/95 to-[#4d93f8]/95 p-6 shadow-smooth sm:p-8 lg:grid-cols-2 animate-fade-up overflow-hidden">
            {/* Inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-3xl pointer-events-none" />

            <div className="relative z-10 self-center">
              <p className="inline-block px-3 py-1 bg-blue-200/20 text-xs font-semibold uppercase tracking-widest text-blue-100 rounded-full backdrop-blur-sm">
                📋 Order Section
              </p>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white lg:text-5xl leading-tight">
                Request your <span className="inline-block bg-gradient-to-r from-[#a6d0ff] to-[#90ee90] bg-clip-text text-transparent">Enzora device</span>
              </h2>
              <p className="mt-4 max-w-md text-lg leading-8 text-blue-100">
                Submit your details and our team will contact you with availability,
                pilot program details, and next order steps.
              </p>

              {/* Feature bullets */}
              <div className="mt-6 space-y-3">
                {[
                  "Fast response from our team",
                  "Flexible pilot programs available",
                  "Expert technical support included"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-blue-50">
                    <span className="text-lg">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 grid gap-4 rounded-2xl border border-white/30 backdrop-blur-md bg-white/95 p-5 shadow-xl sm:p-6 hover:bg-white transition-colors duration-300 animate-fade-up-delayed">
              <label className="grid gap-1.5 text-base font-medium text-slate-700">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Mohammad AbuSaleh"
                  className="h-11 rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/20 placeholder-slate-400"
                />
              </label>
              <label className="grid gap-1.5 text-base font-medium text-slate-700">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="h-11 rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/20 placeholder-slate-400"
                />
              </label>
              <label className="grid gap-1.5 text-base font-medium text-slate-700">
                <span>Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+962..."
                  className="h-11 rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/20 placeholder-slate-400"
                />
              </label>
              <label className="grid gap-1.5 text-base font-medium text-slate-700">
                <span>Company</span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                  className="h-11 rounded-xl border-2 border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/20 placeholder-slate-400"
                />
              </label>
              <label className="grid gap-1.5 text-base font-medium text-slate-700">
                <span>Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your use case..."
                  className="rounded-xl border-2 border-slate-200 px-4 py-2 text-slate-900 outline-none transition focus:border-[#6E75BF] focus:ring-2 focus:ring-[#6E75BF]/20 placeholder-slate-400 resize-none"
                />
              </label>
              {message && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${message.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                  <span className="text-lg">{message.includes("✓") ? "✓" : "✕"}</span>
                  <span>{message.replace(/✓|✗/, "").trim()}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary mt-2 h-12 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isLoading ? "Submitting..." : "Submit Order Request"}
              </button>
              <p className="text-xs text-slate-500 text-center">
                We'll get back to you within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
