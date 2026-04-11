const features = [
  "Early Infection Detection",
  "Reusable Device",
  "WiFi Connectivity",
  "Real-Time Monitoring",
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-20">
      <div className="section-wrap">
        <p className="section-kicker animate-fade-up">Capabilities</p>
        <h2 className="section-title mt-4 animate-fade-up-delayed">Core Features</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature}
              className="card-surface p-6 text-center transition duration-300 hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 h-2 w-14 rounded-full bg-gradient-to-r from-[#2f52d7] to-[#21c59b]" />
              <h3 className="text-xl font-bold text-[#132a67] lg:text-[1.4rem]">{feature}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
