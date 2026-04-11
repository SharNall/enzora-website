import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Admin</h1>
        <p className="mt-5 max-w-2xl leading-8 text-slate-600">
          Password-protected order management dashboard will be implemented in
          the admin phase.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
