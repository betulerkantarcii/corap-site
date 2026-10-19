import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { PawPrint } from "@/components/ui/PawPrint";
import { FooterCat } from "./FooterCat";
import { site } from "@/content/site";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  const external = [
    { href: site.instagramUrl, label: t("instagram") },
    { href: site.etsyShopUrl, label: t("etsy") },
  ];

  return (
    <footer className="section-night paper-grain">
      <div className="pattern-tabby h-2" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sock-white/80">{t("tagline")}</p>
          <FooterCat />
        </div>

        <ul className="space-y-2">
          {(["shop", "about"] as const).map((key) => (
            <li key={key}>
              <Link
                href={`/${key}`}
                className="inline-flex items-center gap-2 rounded-md py-1 hover:text-bean-pink"
              >
                <PawPrint className="h-4 w-4 text-tabby-caramel" />
                {nav(key)}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="space-y-2">
          {external.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md py-1 hover:text-bean-pink"
              >
                <PawPrint className="h-4 w-4 text-tabby-caramel" />
                {label}
                <span className="sr-only">{t("opensInNewTab")}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-white/10 px-4 py-5 text-center text-sm text-sock-white/70">
        {t("rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
