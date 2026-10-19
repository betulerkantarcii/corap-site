import { useLocale, useTranslations } from "next-intl";
import { Polaroid } from "@/components/ui/Polaroid";
import { instagramPosts } from "@/content/instagram";
import { site } from "@/content/site";

const TILTS = [-4, 3, -2, 5, -3, 2];

/** Curated Instagram posts as taped-up polaroids. Scrolls sideways on small screens. */
export function InstagramStrip() {
  const t = useTranslations("Instagram");
  const locale = useLocale() as "tr" | "en";
  const handle = `@${new URL(site.instagramUrl).pathname.replaceAll("/", "")}`;

  return (
    <section className="section-sock paper-grain overflow-hidden" aria-labelledby="insta-title">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-caramel-ink uppercase">
              {t("eyebrow")}
            </p>
            <h2
              id="insta-title"
              className="mt-2 text-3xl font-semibold text-tabby-spot sm:text-4xl"
            >
              {t("title")}
            </h2>
          </div>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bean-press inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-tabby-brown px-5 font-display font-semibold text-tabby-brown hover:bg-tabby-brown hover:text-sock-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
            </svg>
            {t("follow", { handle })}
            <span className="sr-only">{t("opensInNewTab")}</span>
          </a>
        </div>
      </div>

      <ul className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pt-12 pb-20 sm:gap-10 lg:justify-center lg:overflow-visible">
        {instagramPosts.map((post, i) => (
          <li
            key={`${post.image}-${i}`}
            className="w-52 shrink-0 snap-center sm:w-56 lg:w-[14%] lg:min-w-40"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-sm transition-transform duration-300 ease-squish hover:-translate-y-2 hover:rotate-0"
            >
              <Polaroid
                src={post.image}
                alt={locale === "tr" ? post.alt_tr : post.alt_en}
                caption={locale === "tr" ? post.caption_tr : post.caption_en}
                tilt={TILTS[i % TILTS.length]}
                sizes="14rem"
              />
              <span className="sr-only">{t("opensInNewTab")}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
