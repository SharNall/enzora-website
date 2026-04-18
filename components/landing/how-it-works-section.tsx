const steps = [
  {
    title: "Place the device",
    description: "Attach Enzora above the wound bandage after dressing.",
    color: "from-[#6E75BF] to-[#5a5ba8]"
  },
  {
    title: "Sensor scans color",
    description:
      "The sensor monitors bandage color changes associated with possible infection.",
    color: "from-[#19c89a] to-[#0db584]"
  },
  {
    title: "Results in mobile app",
    description:
      "Data is sent through WiFi so patients and caregivers can review the status instantly.",
    color: "from-[#8b9eff] to-[#6E75BF]"
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-gradient-section py-16 lg:py-20 overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#6E75BF]/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-bl from-[#19c89a]/10 to-transparent rounded-full blur-3xl" />

      <div className="section-wrap relative z-10">
        <p className="section-kicker animate-fade-up">Process</p>
        <h2 className="section-title mt-4 animate-fade-up-delayed">
          How It Works
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600 animate-fade-up-delayed-2">
          A simple 3-step workflow built for real-world use at home or after
          clinical discharge.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative stagger-item" style={{ animationDelay: `${index * 0.15}s` }}>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[calc(50%+60px)] right-[calc(-100%-20px)] h-1 bg-gradient-to-r from-[#6E75BF] via-[#19c89a] to-transparent opacity-30" />
              )}

              <article className="card-surface glass-card p-7 transition duration-300 hover-lift relative overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-2xl text-white font-bold shadow-lg relative z-10 animate-bounce-subtle`} style={{ animationDelay: `${index * 0.3}s` }}>
                  {index + 1}
                </div>

                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d9e2f2] bg-white shadow-sm relative z-10" style={{ animationDelay: `${index * 0.2}s` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={index === 0 ? "M6 13.5L10.2 8.8L13.2 11.2L18 6.8" : index === 1 ? "M5 14C6.5 10.5 8.9 8.7 12 8.7C15.1 8.7 17.5 10.5 19 14" : "M6 12H9.2L11 8.5L13.5 15L15.2 11H18"} stroke={index === 1 ? "#19c89a" : "#6E75BF"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="19" cy="6" r="1.1" fill="#19c89a" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#132a67] relative z-10">{step.title}</h3>
                <p className="mt-3 text-lg leading-8 text-slate-600 relative z-10">{step.description}</p>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
              </article>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 text-lg">
            Ready to experience smarter wound care?
          </p>
          <a href="#order" className="inline-block mt-4 btn-primary h-12 px-8 shadow-md hover:shadow-lg transition-all">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
