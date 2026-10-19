import Image from "next/image";

type PolaroidProps = {
  src: string;
  alt: string;
  caption?: string;
  /** Degrees of tilt, e.g. -3 */
  tilt?: number;
  sizes?: string;
  className?: string;
};

/** Instant-photo frame with two strips of paw-print tape on the top corners. */
export function Polaroid({
  src,
  alt,
  caption,
  tilt = 0,
  sizes = "16rem",
  className = "",
}: PolaroidProps) {
  return (
    <figure
      className={`relative bg-sock-white p-3 pb-4 shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] ${className}`}
      style={{ rotate: `${tilt}deg` }}
    >
      <span aria-hidden="true" className="paw-tape absolute -top-3 -left-4 -rotate-[38deg]" />
      <span aria-hidden="true" className="paw-tape absolute -top-3 -right-4 rotate-[38deg]" />
      <div className="relative aspect-square overflow-hidden bg-sock-cream">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-display text-lg text-tabby-brown">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
