import type { CSSProperties } from "react";

/**
 * Paw icon set. All decorative by default (aria-hidden); pass `title` when an
 * icon carries meaning on its own. Single-color icons use currentColor.
 */
type IconProps = { className?: string; title?: string; style?: CSSProperties };

function a11y(title?: string) {
  return title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
}

export { PawPrint } from "./PawPrint";

/** Outline paw print — for subtle bullets and empty states. */
export function PawOutline({ className, title }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...a11y(title)}>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="7.5" cy="13" rx="2.8" ry="3.6" transform="rotate(-18 7.5 13)" />
        <ellipse cx="13" cy="7.5" rx="2.8" ry="3.8" transform="rotate(-6 13 7.5)" />
        <ellipse cx="19.5" cy="7.5" rx="2.8" ry="3.8" transform="rotate(6 19.5 7.5)" />
        <ellipse cx="25" cy="13" rx="2.8" ry="3.6" transform="rotate(18 25 13)" />
        <path d="M16.2 15.5c-4.2 0-8 4.7-8 8.1 0 2.6 2 3.6 4.2 3.6 1.6 0 2.5-.8 3.8-.8s2.2.8 3.8.8c2.2 0 4.2-1 4.2-3.6 0-3.4-3.8-8.1-8-8.1Z" />
      </g>
    </svg>
  );
}

/** Full-color paw underside: white sock fur with pink toe beans. */
export function BeanPaw({ className, title }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...a11y(title)}>
      <path
        className="c-sock c-line"
        d="M20 4C10 4 4 12 4 21c0 9 7 15 16 15s16-6 16-15C36 12 30 4 20 4Z"
      />
      <g className="c-bean">
        <ellipse cx="10.5" cy="17" rx="3" ry="3.8" transform="rotate(-20 10.5 17)" />
        <ellipse cx="16.5" cy="12" rx="3" ry="4" />
        <ellipse cx="23.5" cy="12" rx="3" ry="4" />
        <ellipse cx="29.5" cy="17" rx="3" ry="3.8" transform="rotate(20 29.5 17)" />
        <path d="M20 19.5c-4 0-7.5 4-7.5 7 0 2.4 1.8 3.5 4 3.5 1.5 0 2.3-.6 3.5-.6s2 .6 3.5.6c2.2 0 4-1.1 4-3.5 0-3-3.5-7-7.5-7Z" />
      </g>
    </svg>
  );
}

/** A little sock: tabby cuff, white foot, pink toe. */
export function SockIcon({ className, title, style }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} {...a11y(title)}>
      <path
        className="c-sock"
        d="M12 3h15v19c0 2 1 3 3 4.5 4 3 4.5 9-.5 11-3 1.2-6 .3-8.5-1.5L10 28c-3-2-3.5-5-2-7.5L12 16Z"
      />
      <path className="c-fur" d="M12 3h15v8H12Z" />
      <path className="c-spot" d="M15 5.5h3v1.6h-3ZM21 7.5h3.4v1.6H21Z" />
      <path className="c-bean" d="M24 31.5c2.5 2 6 2.6 7.6.4 1.4-2 .6-4.6-1.6-5.9Z" />
      <path
        className="c-line"
        fill="none"
        d="M12 3h15v19c0 2 1 3 3 4.5 4 3 4.5 9-.5 11-3 1.2-6 .3-8.5-1.5L10 28c-3-2-3.5-5-2-7.5L12 16Z"
      />
    </svg>
  );
}

/** Ball of yarn in bean pink. */
export function YarnBall({ className, title }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...a11y(title)}>
      <circle className="c-bean c-line" cx="18" cy="20" r="14" />
      <path
        className="c-line-thin"
        fill="none"
        d="M7 13c6 1 14 7 18 18M10 9c7 2 15 9 19 18M5 21c5 0 12 4 15 12M20 6c-2 6-1 15 6 24M29 10c-6 3-14 12-15 23"
      />
      <path className="c-line-thin" fill="none" d="M31 26c3 2 5 5 4 9" />
    </svg>
  );
}

/** Trail of small prints walking right, for dividers and loaders. */
export function PawTrail({ className, title }: IconProps) {
  return (
    <svg viewBox="0 0 128 32" className={className} fill="currentColor" {...a11y(title)}>
      {[0, 1, 2, 3].map((i) => (
        <g
          key={i}
          transform={`translate(${i * 32 + 14} ${i % 2 ? 9 : 23}) rotate(90) scale(.5) translate(-16 -16)`}
          opacity={0.4 + i * 0.2}
        >
          <ellipse cx="7.5" cy="13" rx="3.2" ry="4" transform="rotate(-18 7.5 13)" />
          <ellipse cx="13" cy="7.5" rx="3.2" ry="4.2" />
          <ellipse cx="19.5" cy="7.5" rx="3.2" ry="4.2" />
          <ellipse cx="25" cy="13" rx="3.2" ry="4" transform="rotate(18 25 13)" />
          <path d="M16.2 14.5c-4.6 0-9 5.1-9 9.1 0 3 2.4 4.4 5 4.4 1.7 0 2.7-.8 4-.8s2.3.8 4 .8c2.6 0 5-1.4 5-4.4 0-4-4.4-9.1-9-9.1Z" />
        </g>
      ))}
    </svg>
  );
}
