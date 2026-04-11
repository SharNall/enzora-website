const steps = [
  {
    title: "Place the device",
    description: "Attach Enzora above the wound bandage after dressing.",
  },
  {
    title: "Sensor scans color",
    description:
      "The sensor monitors bandage color changes associated with possible infection.",
  },
  {
    title: "Results in mobile app",
    description:
      "Data is sent through WiFi so patients and caregivers can review the status instantly.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-20">
      <div className="section-wrap">
        <p className="section-kicker">Process</p>
        <h2 className="section-title mt-4">How It Works</h2>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600 animate-fade-up">
          A simple 3-step workflow built for real-world use at home or after
          clinical discharge.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="card-surface p-6 transition duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="grad-panel mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold text-[#132a67]">{step.title}</h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
