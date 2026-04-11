export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-600 sm:px-10 lg:px-16">
        <p className="font-medium text-slate-700">Enzora</p>
        <p>Smart infection-detecting bandage technology for better wound monitoring.</p>
        <p>© {new Date().getFullYear()} Enzora. All rights reserved.</p>
      </div>
    </footer>
  );
}
