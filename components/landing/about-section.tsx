export function AboutSection() {
  return (
    <section id="about" className="relative py-16 lg:py-20 bg-gradient-section overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#6E75BF]/8 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#19c89a]/8 to-transparent rounded-full blur-3xl" />

      <div className="section-wrap relative z-10 grid gap-8 lg:grid-cols-2">
        <article className="card-surface bg-[#f8faff] p-7 transition duration-300 animate-fade-up hover-lift">
          <p className="section-kicker">About Us</p>
          <h2 className="section-title mt-4">About Enzora</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 lg:text-xl">
            Enzora is a medical technology startup focused on proactive wound care.
            We combine smart sensing hardware and connected software to reduce late
            infection discovery and improve confidence during recovery.
          </p>
          <div className="mt-6 flex gap-4 border-t border-[#e0e5f0] pt-4">
            <div className="flex-shrink-0 rounded-lg border border-[#d9e2f2] bg-white p-2 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="5" stroke="#6E75BF" strokeWidth="1.6" />
                <path d="M8 12.5L10.7 15L16 8.8" stroke="#19c89a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[#2748c9]">Innovation-Focused</p>
              <p className="text-sm text-slate-600">Cutting-edge technology meets healthcare</p>
            </div>
          </div>
        </article>

        <div className="grid gap-5">
          <article className="card-surface p-7 transition duration-300 animate-fade-up-delayed hover-lift glass-card">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[#d9e2f2] bg-gradient-to-br from-[#6E75BF]/15 to-[#19c89a]/15 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8" stroke="#6E75BF" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="3" fill="#19c89a" />
                <path d="M12 4V7" stroke="#6E75BF" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M20 12H17" stroke="#6E75BF" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2748c9] lg:text-[2rem]">Mission</h3>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Deliver accessible, at-home infection detection support for diabetic
              and post-surgery patients through reliable smart monitoring.
            </p>
            <div className="mt-4 inline-block rounded-full bg-[#6E75BF]/10 px-3 py-1 text-sm font-medium text-[#6E75BF]">
              Patient-Centric
            </div>
          </article>

          <article className="card-surface p-7 transition duration-300 animate-fade-up-delayed-2 hover-lift glass-card">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[#d9e2f2] bg-gradient-to-br from-[#19c89a]/15 to-[#6E75BF]/15 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L14.6 9.1L20 10L16 13.6L17 19L12 16.3L7 19L8 13.6L4 10L9.4 9.1L12 4Z" stroke="#6E75BF" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 8.5L13.2 11.1L16 11.5L14 13.3L14.5 16L12 14.6L9.5 16L10 13.3L8 11.5L10.8 11.1L12 8.5Z" fill="#19c89a" opacity="0.85" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2748c9] lg:text-[2rem]">Vision</h3>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Make intelligent wound health monitoring a standard layer of care,
              enabling earlier medical decisions and better long-term outcomes.
            </p>
            <div className="mt-4 inline-block rounded-full bg-[#19c89a]/10 px-3 py-1 text-sm font-medium text-[#19c89a]">
              Healthcare Evolution
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
