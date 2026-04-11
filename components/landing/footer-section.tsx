import Image from "next/image";

const socialLinks = [
  {
    href: "https://linkedin.com/in/enzora-bzu-78b008400",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.94 7.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.5 8.75h2.88V19.5H5.5V8.75Zm5.1 0h2.76v1.46h.04c.38-.72 1.32-1.48 2.72-1.48 2.9 0 3.43 1.9 3.43 4.36v6.41h-2.88v-5.68c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.78H10.6V8.75Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/enzora.bzu/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5.5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/profile.php?id=61574411847833",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 8.5V7.1c0-.8.53-1.1 1.1-1.1h1.4V3.5h-2a3.6 3.6 0 0 0-3.6 3.6v1.4H8.7V12h2.2v8.5h3V12h2.3l.4-3.5H13.9Z" fill="currentColor"/>
      </svg>
    ),
  },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#product", label: "Product" },
  { href: "#order", label: "Order" },
];

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-[#dbe5ff] bg-[linear-gradient(180deg,#fbfcff_0%,#f3f7ff_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4d53dc] to-transparent" />
      <div className="section-wrap py-14 lg:py-16">
        <div className="grid gap-10 rounded-[2rem] border border-[#d9e4ff] bg-white/90 p-6 shadow-[0_24px_50px_-38px_rgba(41,63,160,0.45)] backdrop-blur sm:p-8 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1fr] lg:p-10">
          <div className="space-y-5">
            <Image
              src="/enzora-logo.svg"
              alt="Enzora logo"
              width={248}
              height={66}
            />
            <p className="max-w-sm text-base leading-7 text-slate-600">
              Smart infection detection technology for modern wound care,
              designed to support patients, clinicians, and caregivers.
            </p>
            <div className="inline-flex items-center rounded-full border border-[#dbe5ff] bg-[#f7faff] px-4 py-2 text-sm font-semibold text-[#2748c9] shadow-sm">
              Medical innovation • Connected monitoring • Trusted care
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Company
            </p>
            <ul className="mt-5 space-y-3 text-base text-slate-700">
              <li>
                <a href="#about" className="transition hover:text-[#2b4fd6]">
                  About Enzora
                </a>
              </li>
              <li>
                <a href="#product" className="transition hover:text-[#2b4fd6]">
                  Product Vision
                </a>
              </li>
              <li>
                <a href="#order" className="transition hover:text-[#2b4fd6]">
                  Request Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3 text-base text-slate-700">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-[#2b4fd6]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contact
            </p>
            <div className="mt-5 space-y-4 text-base text-slate-700">
              <p>
                <span className="block text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </span>
                <a href="mailto:enzora.bzu@gmail.com" className="transition hover:text-[#2b4fd6]">
                  enzora.bzu@gmail.com
                </a>
              </p>
              <p>
                <span className="block text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Phone
                </span>
                <a href="tel:+962700000000" className="transition hover:text-[#2b4fd6]">
                  +962 7X XXX XXXX
                </a>
              </p>
              <div>
                <span className="block text-sm font-semibold uppercase tracking-wide text-slate-400">
                  Social Media
                </span>
                <div className="mt-3 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e3ff] bg-[#f7faff] text-[#2748c9] transition duration-300 hover:-translate-y-0.5 hover:border-[#aebfff] hover:bg-white hover:shadow-md"
                    >
                      <span className="h-5 w-5 transition-transform duration-300 group-hover:scale-110">
                        {link.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#dbe5ff] pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Enzora. All rights reserved.</p>
          <p>Smart Infection Detection Bandage • Built for modern wound-care monitoring.</p>
        </div>
      </div>
    </footer>
  );
}
