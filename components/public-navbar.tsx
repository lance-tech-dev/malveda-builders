
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];

export default function PublicNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-6 py-4 shadow-lg backdrop-blur-xl">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          MALVEDA <span className="text-brand">BUILDERS</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <Link
          href="/contact"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
