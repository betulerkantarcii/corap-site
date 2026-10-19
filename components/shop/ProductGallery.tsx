"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, type PointerEvent } from "react";
import { imageAlt, type ProductImage } from "@/lib/catalog";

/**
 * Main photo + thumbnails. On hover-capable screens the photo magnifies under
 * the cursor; tapping/clicking opens a full-screen view (native <dialog>, so
 * Esc and focus trapping come for free). Arrow keys flip photos in the dialog.
 */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const locale = useLocale() as "tr" | "en";
  const t = useTranslations("Product");
  const [index, setIndex] = useState(0);
  const [origin, setOrigin] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = images[index];
  if (!current) return null;

  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    );
  };
  const step = (d: number) => setIndex((i) => (i + d + images.length) % images.length);

  return (
    <div>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        onPointerMove={onMove}
        onPointerLeave={() => setOrigin(null)}
        aria-label={t("zoom")}
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-blob bg-sock-white"
      >
        <Image
          src={current.src}
          alt={imageAlt(current, locale)}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-200 motion-reduce:transition-none"
          style={origin ? { transform: "scale(1.9)", transformOrigin: origin } : undefined}
        />
      </button>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-3" aria-label={t("gallery")}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("showPhoto", { n: i + 1 })}
                aria-current={i === index ? "true" : undefined}
                className={`bean-press relative block h-20 w-16 overflow-hidden rounded-2xl border-2 bg-sock-white ${
                  i === index
                    ? "border-tabby-spot"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="4rem" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={t("gallery")}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto h-[92dvh] max-h-none w-[94vw] max-w-5xl rounded-blob bg-night p-0 text-sock-white backdrop:bg-night/85"
      >
        <div className="relative h-full w-full">
          <Image
            src={current.src}
            alt={imageAlt(current, locale)}
            fill
            sizes="94vw"
            className="object-contain"
          />
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className="bean-press absolute top-3 right-3 min-h-11 rounded-full bg-bean-pink px-5 font-display font-semibold text-night"
          >
            {t("closeZoom")}
          </button>
        </div>
      </dialog>
    </div>
  );
}
