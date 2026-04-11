import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Order</h1>
        <p className="mt-5 max-w-2xl leading-8 text-slate-600">
          The full order form and generated order number workflow will be built
          in the next implementation step with Firestore integration.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
