export function OrderSection() {
  return (
    <section id="order" className="py-16 lg:py-20">
      <div className="section-wrap">
        <div className="grid gap-8 rounded-3xl border border-[#cedbff] bg-gradient-to-br from-[#1f3fbf] via-[#4d53dc] to-[#4d93f8] p-6 shadow-[0_28px_56px_-30px_rgba(37,62,169,0.75)] sm:p-8 lg:grid-cols-2 animate-fade-up">
          <div className="self-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
              Order Section
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Request your Enzora device
            </h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-blue-100">
              Submit your details and our team will contact you with availability,
              pilot program details, and next order steps.
            </p>
          </div>

          <form className="grid gap-4 rounded-2xl border border-white/20 bg-white p-5 shadow-lg sm:p-6 animate-fade-up-delayed">
            <label className="grid gap-1.5 text-base font-medium text-slate-700">
              Name
              <input
                type="text"
                name="name"
                required
                placeholder="Mohammad AbuSaleh"
                className="h-11 rounded-xl border border-slate-200 px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="grid gap-1.5 text-base font-medium text-slate-700">
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="h-11 rounded-xl border border-slate-200 px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="grid gap-1.5 text-base font-medium text-slate-700">
              Phone
              <input
                type="tel"
                name="phone"
                required
                placeholder="+962..."
                className="h-11 rounded-xl border border-slate-200 px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="grid gap-1.5 text-base font-medium text-slate-700">
              Quantity
              <input
                type="number"
                name="quantity"
                min={1}
                required
                placeholder="1"
                className="h-11 rounded-xl border border-slate-200 px-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <label className="grid gap-1.5 text-base font-medium text-slate-700">
              Notes
              <textarea
                name="notes"
                rows={4}
                placeholder="Tell us about your use case..."
                className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <button
              type="submit"
              className="btn-primary mt-1 h-12 rounded-xl text-base"
            >
              Submit Order Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
