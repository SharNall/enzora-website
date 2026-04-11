export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-20">
      <div className="section-wrap grid gap-8 lg:grid-cols-2">
        <article className="card-surface bg-[#f8faff] p-7 transition duration-300 animate-fade-up">
          <p className="section-kicker">About Us</p>
          <h2 className="section-title mt-4">About Enzora</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 lg:text-xl">
            Enzora is a medical technology startup focused on proactive wound care.
            We combine smart sensing hardware and connected software to reduce late
            infection discovery and improve confidence during recovery.
          </p>
        </article>

        <div className="grid gap-5">
          <article className="card-surface p-7 transition duration-300 animate-fade-up-delayed">
            <h3 className="text-2xl font-bold text-[#2748c9] lg:text-[2rem]">Mission</h3>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Deliver accessible, at-home infection detection support for diabetic
              and post-surgery patients through reliable smart monitoring.
            </p>
          </article>
          <article className="card-surface p-7 transition duration-300 animate-fade-up-delayed-2">
            <h3 className="text-2xl font-bold text-[#2748c9] lg:text-[2rem]">Vision</h3>
            <p className="mt-3 text-lg leading-8 text-slate-600">
              Make intelligent wound health monitoring a standard layer of care,
              enabling earlier medical decisions and better long-term outcomes.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
