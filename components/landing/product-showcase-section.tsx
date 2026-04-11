import Image from "next/image";

export function ProductShowcaseSection() {
  return (
    <section id="product" className="bg-white py-16 lg:py-20">
      <div className="section-wrap grid items-center gap-8 lg:grid-cols-2">
        <article className="card-surface p-7 transition duration-300 animate-fade-up">
          <p className="section-kicker">
            Product Showcase
          </p>
          <h2 className="section-title mt-4">
            Smart Infection Detection Bandage Device
          </h2>
          <ul className="mt-5 space-y-3 text-lg leading-8 text-slate-600">
            <li>• Compact hardware format: 6 × 3 × 2 cm</li>
            <li>• Non-invasive monitoring over the wound bandage</li>
            <li>• Sensor-driven color analysis for anomaly detection</li>
            <li>• Mobile-ready alerts through WiFi synchronization</li>
          </ul>
        </article>

        <div className="grad-panel rounded-3xl p-8 text-white shadow-[0_22px_60px_-28px_rgba(60,66,201,0.6)] animate-fade-up-delayed">
          <p className="text-base font-semibold text-blue-100">Product + App Demo</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/30 bg-white/10">
            <Image
              src="/enzora-hero-art.png"
              alt="Enzora smart wound monitoring visual"
              width={1376}
              height={768}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-base">
            <div className="rounded-xl bg-white/15 px-3 py-2 font-semibold">Color Sensor</div>
            <div className="rounded-xl bg-white/15 px-3 py-2 font-semibold">ESP WiFi</div>
            <div className="rounded-xl bg-emerald-400/25 px-3 py-2 font-semibold">Realtime Alerts</div>
            <div className="rounded-xl bg-white/15 px-3 py-2 font-semibold">Reusable</div>
          </div>
        </div>
      </div>
    </section>
  );
}
