import Image from "next/image";

const details = [
  "Compact hardware format: 6 × 3 × 2 cm",
  "Non-invasive monitoring over the wound bandage",
  "Sensor-driven color analysis for anomaly detection",
  "Mobile-ready alerts through WiFi synchronization",
];

export function ProductShowcaseSection() {
  const features = [
    {
      label: "Color Sensor",
    },
    {
      label: "ESP WiFi",
    },
    {
      label: "Realtime Alerts",
    },
    {
      label: "Reusable",
    },
  ];

  return (
    <section id="product" className="relative bg-gradient-section py-16 lg:py-20 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6E75BF]/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-[#19c89a]/10 to-transparent rounded-full blur-3xl" />

      <div className="section-wrap relative z-10 grid items-center gap-8 lg:grid-cols-2">
        <article className="card-surface glass-card p-7 transition duration-300 animate-fade-up hover-lift">
          <p className="section-kicker">Product Showcase</p>
          <h2 className="section-title mt-4">Smart Infection Detection Bandage Device</h2>

          <ul className="mt-6 space-y-4">
            {details.map((detail, idx) => (
              <li
                key={detail}
                className="flex gap-3 text-lg leading-8 text-slate-600 stagger-item"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
              
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-[#e0e5f0]">
            <p className="text-sm font-semibold text-[#6E75BF] mb-3">Key Advantages</p>
            <div className="flex flex-wrap gap-2">
              {["Affordable", "Reliable", "User-Friendly", "Scalable"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#6E75BF]/10 text-[#6E75BF] rounded-full text-sm font-medium hover:bg-[#6E75BF]/20 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className="relative animate-fade-up-delayed">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6E75BF]/20 via-[#19c89a]/20 to-[#6E75BF]/10 rounded-3xl blur-xl -z-10 animate-pulse" />

          <div className="grad-panel rounded-3xl p-8 text-white shadow-smooth hover-lift relative">
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-semibold text-blue-100">Product + App Demo</p>
              <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                Live Demo
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <Image
                src="/enzora-hero-art.png"
                alt="Enzora smart wound monitoring visual"
                width={1376}
                height={768}
                className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {features.map((feature, idx) => (
                <div
                  key={feature.label}
                  className="rounded-xl bg-gradient-to-br from-white/20 to-white/5 px-3 py-3 font-semibold text-sm backdrop-blur-sm hover:from-white/30 hover:to-white/15 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 stagger-item text-center"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div>{feature.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
