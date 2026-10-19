type LogoProps = {
  className?: string;
  /** "light" for dark backgrounds, "dark" for light backgrounds. */
  tone?: "light" | "dark";
};

/** Wordmark: "The House Cat" with "Çorap" underneath, beside two sock paws. */
export function Logo({ className = "", tone = "light" }: LogoProps) {
  const text = tone === "light" ? "text-sock-white" : "text-tabby-spot";
  const sub = tone === "light" ? "text-bean-pink" : "text-caramel-ink";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <SockPawsMark className="h-10 w-auto shrink-0 sm:h-11" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-base font-semibold tracking-wide whitespace-nowrap sm:text-lg ${text}`}
        >
          The House Cat
        </span>
        <span className={`font-display text-sm font-medium ${sub}`}>Çorap</span>
      </span>
    </span>
  );
}

// One leg of the mark, modelled on the watercolor: furry flared top, slim
// ankle, round white paw. Exported so the favicon/OG art can match it.
export const MARK_LEG = {
  outline:
    "M-12 4L-9 -1L-5 3L-1 -2L3 3L7 -1L12 4C11 14 9 22 9 30C9 38 14 44 14 52C14 59 9 62 0 62S-14 59 -14 52C-14 44 -9 38 -9 30C-9 22 -11 14 -12 4Z",
  fur: "M-12 4L-9 -1L-5 3L-1 -2L3 3L7 -1L12 4C11 14 9 22 9 30V32L6 34L3 32L0 34L-3 32L-6 34L-9 32V30C-9 22 -11 14 -12 4Z",
  toes: "M-4.5 54V61M4.5 54V61",
};

function MarkLeg({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path className="c-sock" d={MARK_LEG.outline} />
      <path className="c-fur" d={MARK_LEG.fur} />
      <g className="c-spot">
        <ellipse cx="-4" cy="11" rx="3.2" ry="1.7" transform="rotate(-14 -4 11)" />
        <ellipse cx="4" cy="19" rx="3" ry="1.6" transform="rotate(12 4 19)" />
        <ellipse cx="-3" cy="26" rx="2.4" ry="1.4" />
      </g>
      <g className="c-bean">
        <ellipse cx="-9" cy="59.6" rx="3" ry="1.4" />
        <ellipse cx="0" cy="60.6" rx="3" ry="1.4" />
        <ellipse cx="9" cy="59.6" rx="3" ry="1.4" />
      </g>
      <path className="c-line-thin" fill="none" d={MARK_LEG.toes} />
      <path className="c-line" fill="none" d={MARK_LEG.outline} />
    </g>
  );
}

/** The mark on its own: Çorap's two front legs, tabby above, white socks below. */
export function SockPawsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-1.5 -4 61 68" className={className} aria-hidden="true">
      <MarkLeg x={15} />
      <MarkLeg x={43} />
    </svg>
  );
}
