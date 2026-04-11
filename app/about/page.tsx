import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">About Enzora</h1>
        <p className="mt-5 max-w-2xl leading-8 text-slate-600">
          Enzora is a medical startup building smart monitoring tools for wound
          care. This page will include your mission, vision, and full team story
          in the next step.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
