"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { PawPrint } from "@/components/ui/PawPrint";
import { PrefsControls } from "@/components/delight/PrefsControls";
import { LanguageToggle } from "./LanguageToggle";

const NAV = [
  { href: "/shop", key: "shop" },
  { href: "/about", key: "about" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="section-night sticky top-0 z-40 border-b border-white/10">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link href="/" aria-label={t("home")} className="rounded-xl">
          <Logo />
        </Link>

        <nav aria-label={t("mainNav")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className="group flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-base font-medium transition-colors hover:text-bean-pink aria-[current=page]:text-bean-pink"
                >
                  <PawPrint className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 group-aria-[current=page]:opacity-100" />
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <PrefsControls compact />
          </div>
          <LanguageToggle />
          <button
            type="button"
            className="bean-press flex h-11 w-11 items-center justify-center rounded-full hover:bg-sock-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("menu")}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h10"}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label={t("mainNav")}
        hidden={!open}
        className="border-t border-white/10 md:hidden"
      >
        <ul className="flex flex-col px-4 py-3">
          {NAV.map(({ href, key }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className="flex items-center gap-3 rounded-xl px-2 py-3 font-display text-xl font-medium hover:text-bean-pink aria-[current=page]:text-bean-pink"
              >
                <PawPrint className="h-5 w-5 text-bean-pink" />
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mx-4 border-t border-white/10 px-0 pt-2 pb-4">
          <PrefsControls />
        </div>
      </nav>
    </header>
  );
}
