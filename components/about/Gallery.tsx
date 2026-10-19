"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useDelight } from "@/components/delight/DelightProvider";
import { gallery, type GalleryItem } from "@/content/about";

/**
 * Masonry-style wall of photos and short videos. Each tile opens a full-size
 * view in a native <dialog>. Videos are silent loops that only play while on
 * screen, and not at all in calm / reduced motion (poster + play badge instead).
 */
export function Gallery() {
  const t = useTranslations("About");
  const locale = useLocale() as "tr" | "en";
  const { motionOK } = useDelight();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
                setIsOpen(true);
                dialog.current?.showModal();
              }}
              className="group relative block w-full overflow-hidden rounded-blob bg-sock-cream"
            >
              {g.video ? (
                <LoopVideo item={g} label={g.alt[locale]} play={motionOK} />
              ) : (
                <Image
                  src={g.src}
                  alt={g.alt[locale]}
                  width={g.width}
                  height={g.height}
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-night/75 px-3 py-1 text-xs font-semibold text-sock-white">
                {g.video && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
                    <path d="M3 1.5v9l7.5-4.5Z" fill="currentColor" />
                  </svg>
                )}
                {t(g.kind)}
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
        onClose={() => setIsOpen(false)}
        className="m-auto h-[90dvh] max-h-none w-[94vw] max-w-5xl rounded-blob bg-night p-0 backdrop:bg-night/85"
      >
        {current && isOpen && (
          <div className="relative h-full w-full">
            {current.video ? (
              <video
                src={current.video}
                poster={current.src}
                aria-label={current.alt[locale]}
                controls
                muted
                loop
                playsInline
                autoPlay={motionOK}
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={current.src}
                alt={current.alt[locale]}
                fill
                sizes="94vw"
                className="object-contain"
              />
            )}
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

/** Silent looping tile video: loads nothing until near the screen, plays only while visible. */
function LoopVideo({ item, label, play }: { item: GalleryItem; label: string; play: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!play) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [play]);

  return (
    <video
      ref={ref}
      src={item.video}
      poster={item.src}
      aria-label={label}
      width={item.width}
      height={item.height}
      muted
      loop
      playsInline
      preload="none"
      className="h-auto w-full"
    />
  );
}
