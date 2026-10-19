import type { CSSProperties } from "react";

type PawPrintProps = {
  className?: string;
  style?: CSSProperties;
  /** Pass a label only when the paw carries meaning; otherwise it's hidden from screen readers. */
  title?: string;
};

/** Simple toe-bean paw print. Inherits color from `currentColor`. */
export function PawPrint({ className, style, title }: PawPrintProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={style}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <ellipse cx="7.5" cy="13" rx="3.2" ry="4" transform="rotate(-18 7.5 13)" />
      <ellipse cx="13" cy="7.5" rx="3.2" ry="4.2" transform="rotate(-6 13 7.5)" />
      <ellipse cx="19.5" cy="7.5" rx="3.2" ry="4.2" transform="rotate(6 19.5 7.5)" />
      <ellipse cx="25" cy="13" rx="3.2" ry="4" transform="rotate(18 25 13)" />
      <path d="M16.2 14.5c-4.6 0-9 5.1-9 9.1 0 3 2.4 4.4 5 4.4 1.7 0 2.7-.8 4-.8s2.3.8 4 .8c2.6 0 5-1.4 5-4.4 0-4-4.4-9.1-9-9.1Z" />
    </svg>
  );
}
