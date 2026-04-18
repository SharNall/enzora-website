import Image from "next/image";

const metrics = [
  {
    label: "Compact device",
    value: "6 × 3 × 2 cm",
    description: "Designed for discreet, wearable monitoring.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5.25" y="6" width="13.5" height="12" rx="3.5" stroke="#6E75BF" strokeWidth="1.6" />
        <rect x="8.2" y="8.6" width="7.6" height="6.8" rx="1.8" fill="#eef2ff" stroke="#19c89a" strokeWidth="1.2" />
        <path d="M10 12H14" stroke="#6E75BF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Wireless sync",
    value: "WiFi",
    description: "Secure data delivery to the mobile experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 9.5C9.1 6.3 14.9 6.3 19 9.5" stroke="#6E75BF" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M7.8 12.4C10.6 10.4 13.4 10.4 16.2 12.4" stroke="#19c89a" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10.8 15.2C11.5 14.7 12.5 14.7 13.2 15.2" stroke="#6E75BF" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="18" r="1.2" fill="#19c89a" />
      </svg>
    ),
  },
  {
    label: "Continuous insight",
    value: "24/7",
    description: "Always-on monitoring for faster awareness.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12H7L9 8L12 16L14.5 11H20" stroke="#6E75BF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="11" r="1.2" fill="#19c89a" />
      </svg>
    ),
  },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <Image
          src="/enzora-wave-bg.svg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(110, 117, 191, 0.08) 0%, transparent 35%), radial-gradient(circle at 80% 30%, rgba(25, 200, 154, 0.08) 0%, transparent 28%)",
        }}
      />

      <div className="section-wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex items-center gap-3 animate-fade-up">
            {/* <Image
              src="/enzora-logo.svg"
              alt="Enzora logo"
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            /> */}
            <p className="section-kicker !mb-0">Smart wound monitoring</p>
          </div>

          <h1 className="animate-fade-up-delayed text-5xl font-extrabold leading-tight tracking-tight text-[#111f4f] sm:text-6xl lg:text-7xl">
            Smart infection detection for clearer wound recovery.
          </h1>

          <p className="animate-fade-up-delayed-2 mt-6 max-w-xl text-lg leading-8 text-slate-600 lg:text-xl">
            Enzora analyzes wound bandage color changes with a compact sensor
            device and delivers concise updates to the connected app, helping
            patients and caregivers act with greater confidence.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-up-delayed-2">
            <a
              href="#about"
              className="btn-outline h-12 px-7 text-base transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Learn More
            </a>
            <a
              href="#order"
              className="btn-primary h-12 px-7 text-base shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Order Now
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3 animate-fade-up-delayed-2">
            {metrics.map((metric, index) => (
              <article
                key={metric.label}
                className="card-surface glass-card p-5 transition duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7def0] bg-gradient-to-br from-white to-[#eef3ff] shadow-sm">
                  {metric.icon}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-extrabold text-[#2b4fd6]">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{metric.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="relative w-full max-w-md rounded-[2rem] border-2 border-transparent bg-white p-6 shadow-smooth hover-lift animate-soft-float"
            style={{
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(135deg, #6E75BF, #19c89a)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="h-2.5 w-20 rounded-full bg-gradient-to-r from-[#6E75BF] to-[#19c89a]" />
              {/* <Image
                src="/enzora-logo.svg"
                alt="Enzora logo"
                width={32}
                height={32}
                className="h-8 w-8"
              /> */}
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#dbe5ff] bg-[#f8faff] p-4">
              <Image
                src="/enzora-hero-art.png"
                alt="Enzora smart wound monitoring visual"
                width={1376}
                height={768}
                className="h-auto w-full rounded-2xl transition duration-700 hover:scale-[1.02]"
                priority
              />
            </div>

            <div className="mt-5 rounded-2xl border border-[#dbe5ff] bg-[#f8faff] px-4 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6E75BF]">
                    System status
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-800">
                    Healthy signal and connected app workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
