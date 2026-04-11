import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 animate-soft-drift">
        <Image
          src="/enzora-wave-bg.svg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden
        />
      </div>
      <div className="section-wrap grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="section-kicker mb-5 animate-fade-up">
            SMART WOUND MONITORING
          </p>
          <h1 className="animate-fade-up-delayed text-5xl font-extrabold leading-tight tracking-tight text-[#111f4f] sm:text-6xl lg:text-7xl">
            Smart Infection Detection Bandage for safer recovery.
          </h1>
          <p className="animate-fade-up-delayed-2 mt-6 max-w-xl text-lg leading-8 text-slate-600 lg:text-xl">
            Enzora analyzes wound bandage color changes using a compact sensor
            device and securely sends insights to a mobile app through WiFi,
            helping patients and caregivers react earlier.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-up-delayed-2">
            <a href="#about" className="btn-outline h-12 px-7 text-base transition-transform duration-300 hover:-translate-y-1">
              Learn More
            </a>
            <a href="#order" className="btn-primary h-12 px-7 text-base shadow-md transition-transform duration-300 hover:-translate-y-1">
              Order Now
            </a>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 animate-fade-up-delayed-2">
            <div className="card-surface p-4 text-center transition duration-300 hover:-translate-y-1">
              <p className="text-3xl font-extrabold text-[#2b4fd6]">6×3×2</p>
              <p className="text-sm font-medium text-slate-500">CM DEVICE</p>
            </div>
            <div className="card-surface p-4 text-center transition duration-300 hover:-translate-y-1">
              <p className="text-3xl font-extrabold text-[#2b4fd6]">WiFi</p>
              <p className="text-sm font-medium text-slate-500">SYNC</p>
            </div>
            <div className="card-surface p-4 text-center transition duration-300 hover:-translate-y-1">
              <p className="text-3xl font-extrabold text-emerald-500">24/7</p>
              <p className="text-sm font-medium text-slate-500">MONITORING</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-[2rem] border border-[#dbe5ff] bg-white p-6 shadow-[0_26px_60px_-28px_rgba(43,79,214,0.45)] animate-soft-float">
            <div className="mb-5 h-3 w-24 rounded-full bg-[#dbe5ff]" />
            <div className="overflow-hidden rounded-3xl border border-[#dbe5ff]">
              <Image
                src="/enzora-hero-art.png"
                alt="Enzora smart wound monitoring visual"
                width={1376}
                height={768}
                className="h-auto w-full transition duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="grad-panel mt-5 rounded-2xl px-4 py-3 text-base font-semibold text-white animate-pulse-glow">
              Prototype status: healthy signal and connected app workflow.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
