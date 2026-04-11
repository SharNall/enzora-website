import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#product", label: "Product" },
  { href: "#order", label: "Order" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#d9e4ff] bg-white/95 backdrop-blur">
      <div className="section-wrap flex items-center justify-between py-4">
        <a href="#hero" className="inline-flex items-center">
          <Image
            src="/enzora-logo.svg"
            alt="Enzora logo"
            width={228}
            height={61}
            priority
          />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-slate-600 transition-colors hover:text-[#2b4fd6] xl:text-[1.1rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#order"
          className="btn-primary h-11 px-6"
        >
          Order Now
        </a>
      </div>
    </header>
  );
}
