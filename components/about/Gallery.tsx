"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { gallery } from "@/content/about";

/** Masonry-style photo wall; each tile opens a full-size view in a native <dialog>. */
export function Gallery() {
  const t = useTranslations("About");
  const locale = useLocale() as "tr" | "en";
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(0);
  const current = gallery[open];

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {gallery.map((g, i) => (
          <li key={g.src} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => {
                setOpen(i);
                dialog.current?.showModal();
              }}
              className="group relative block w-full overflow-hidden rounded-blob bg-sock-cream"
            >
              <Image
                src={g.src}
                alt={g.alt[locale]}
                width={g.width}
                height={g.height}
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-night/75 px-3 py-1 text-xs font-semibold text-sock-white">
                {g.kind === "photo" ? t("photo") : t("illustration")}
              </span>
              <span className="sr-only">{t("galleryOpen")}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={t("galleryTitle")}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto h-[90dvh] max-h-none w-[94vw] max-w-5xl rounded-blob bg-night p-0 backdrop:bg-night/85"
      >
        {current && (
          <div className="relative h-full w-full">
            <Image
              src={current.src}
              alt={current.alt[locale]}
              fill
              sizes="94vw"
              className="object-contain"
            />
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              className="bean-press absolute top-3 right-3 min-h-11 rounded-full bg-bean-pink px-5 font-display font-semibold text-night"
            >
              {t("close")}
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
