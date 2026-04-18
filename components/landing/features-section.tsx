const features = [
  {
    name: "Early Infection Detection",
    description: "Intelligent color analysis identifies changes early",
  },
  {
    name: "Reusable Device",
    description: "Sustainable, cost-effective monitoring solution",
  },
  {
    name: "WiFi Connectivity",
    description: "Seamless cloud sync and instant alerts",
  },
  {
    name: "Real-Time Monitoring",
    description: "24/7 continuous wound health tracking",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-16 lg:py-20 bg-gradient-section overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-[#6E75BF]/8 to-transparent rounded-full blur-3xl" />

      <div className="section-wrap relative z-10">
        <p className="section-kicker animate-fade-up">Capabilities</p>
        <h2 className="section-title mt-4 animate-fade-up-delayed">
          Core Features
        </h2>
        <p className="mt-2 text-lg text-slate-600 max-w-2xl animate-fade-up-delayed-2">
          Engineered for reliability, ease of use, and peace of mind
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.name}
              className="card-surface glass-card p-6 transition duration-300 hover-lift border border-[#e0e5f0] stagger-item relative group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6E75BF]/5 to-[#19c89a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6E75BF] via-[#19c89a] to-transparent" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#132a67] lg:text-[1.4rem]">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
