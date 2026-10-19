/**
 * Shared, hook-free SVG parts for cartoon Çorap.
 * Colors come from the c-* paint classes in app/globals.css (brand tokens).
 * Anything that animates is a bare <g> with a corap-* class and NO transform
 * attribute — CSS transforms would otherwise overwrite the positioning.
 */

export type PupilShape = { rx: number; ry: number };

type HeadProps = {
  /** Unique, url-safe id prefix (clip paths). */
  uid: string;
  pupil: PupilShape;
  cheeks?: boolean;
};

/* ---------------- Head (local coords, centered on 0,0) ---------------- */

function Ear() {
  return (
    <g className="corap-ear">
      <path
        className="c-fur c-line"
        d="M-40 -8C-44 -30 -40 -50 -32 -62C-28 -66 -23 -63 -20 -58L-4 -34Z"
      />
      <path className="c-bean-pale" d="M-35 -18C-37 -33 -34 -46 -30.5 -54L-12 -32Z" />
      <path className="c-line-thin" fill="none" d="M-33 -40l6 4M-31 -47l5 5" />
    </g>
  );
}

function Eye({ x, uid, side, pupil }: { x: number; uid: string; side: string; pupil: PupilShape }) {
  const clip = `${uid}-eye-${side}`;
  return (
    <g transform={`translate(${x} -6)`}>
      <clipPath id={clip}>
        <ellipse rx="9.5" ry="10.5" />
      </clipPath>
      <ellipse data-iris className="c-iris" rx="9.5" ry="10.5" />
      <ellipse className="c-iris-light" cy="4" rx="7" ry="5" />
      <g data-pupil>
        <ellipse className="c-pupil" rx={pupil.rx} ry={pupil.ry} />
        <circle className="c-sock" cx="2.8" cy="-3.6" r="2.3" />
        <circle className="c-sock" cx="-2.4" cy="3.4" r="1" opacity=".8" />
      </g>
      <g clipPath={`url(#${clip})`}>
        <ellipse className="c-eye-ring" fill="none" rx="9.5" ry="10.5" />
        {/* Eyelid slides down via --lid: 0 open, 10 sleepy, 21 shut (lash curve reads as ‿) */}
        <g className="corap-lid">
          <path className="c-fur" d="M-13 -40H13V-15Q0 -9 -13 -15Z" />
          <path className="c-line" fill="none" d="M-13 -15Q0 -9 13 -15" />
        </g>
      </g>
    </g>
  );
}

const HEAD_SHAPE = "M-48 4C-50 -26 -26 -42 0 -42S50 -26 48 4C46 28 26 40 0 40S-46 28 -48 4Z";

export function Head({ uid, pupil, cheeks }: HeadProps) {
  return (
    <g>
      {/* ears sit behind the head; the right one is a mirrored left */}
      <Ear />
      <g transform="scale(-1 1)">
        <g className="corap-ear corap-ear-r">
          <Ear />
        </g>
      </g>

      {/* cheek fluff */}
      <path className="c-fur c-line" d="M-44 2L-57 13L-46 16L-53 25L-38 22Z" />
      <path className="c-fur c-line" d="M44 2L57 13L46 16L53 25L38 22Z" />

      <path className="c-fur" d={HEAD_SHAPE} />

      {/* tabby "M" + cheek stripes */}
      <path
        className="c-stripe"
        d="M-15 -40Q-14 -32 -10.5 -26M-26 -36Q-22 -30 -20 -24M15 -40Q14 -32 10.5 -26M26 -36Q22 -30 20 -24M-48 -6Q-40 -6 -33 -1M-47 5Q-40 5 -34 9M48 -6Q40 -6 33 -1M47 5Q40 5 34 9"
      />

      {/* white blaze running up from the muzzle, like the real Çorap */}
      <path
        className="c-sock"
        d="M-2.5 -41C-3 -26 -5 -14 -9 -4C-22 0 -30 14 -24 27C-17 38.5 17 38.5 24 27C30 14 22 0 9 -4C5 -14 3 -26 2.5 -41Z"
      />

      {cheeks && (
        <g className="c-bean" opacity=".6">
          <ellipse cx="-29" cy="15" rx="6.5" ry="3.6" />
          <ellipse cx="29" cy="15" rx="6.5" ry="3.6" />
        </g>
      )}

      <path className="c-line" fill="none" d={HEAD_SHAPE} />

      <Eye x={-18} uid={uid} side="l" pupil={pupil} />
      <Eye x={18} uid={uid} side="r" pupil={pupil} />

      <path className="c-nose c-line-thin" d="M-5.5 9Q0 7 5.5 9Q3 14.5 0 15.5Q-3 14.5 -5.5 9Z" />
      <path
        className="c-line-thin"
        fill="none"
        d="M0 15.5V18.5M-7 19.5Q-3.5 23 0 18.5Q3.5 23 7 19.5"
      />
      <path
        className="c-whisker"
        d="M-17 16L-50 10M-17 19.5L-52 21M-17 23L-47 31M17 16L50 10M17 19.5L52 21M17 23L47 31"
      />
    </g>
  );
}

/* ---------------- Leg with white sock ---------------- */

type LegProps = {
  x: number;
  y: number;
  /** Shoulder-to-toe length. */
  length?: number;
  /** Where the sock starts, 0–1 down the leg. 0 = all sock. */
  sockAt?: number;
  rotate?: number;
  spots?: boolean;
  /** Half the leg width. */
  hw?: number;
};

/**
 * A front-view leg: tabby fur on top, a sharp fur-edged sock line, a white
 * rounded paw with toe splits and pink toe-bean tips. Origin = top center.
 * The top edge has no outline so the leg blends into the body above it.
 */
export function Leg({
  x,
  y,
  length: L = 52,
  sockAt = 0.5,
  rotate = 0,
  spots = true,
  hw = 10,
}: LegProps) {
  const s = Math.round(L * sockAt);
  const f = hw + 4; // paw flare
  const sides = `M${-hw} 0V${L - 12}C${-hw - 3} ${L - 10} ${-f - 1} ${L - 6} ${-f} ${L - 3}C${-f + 1} ${L} ${-hw} ${L} ${-hw + 2} ${L}H${hw - 2}C${hw} ${L} ${f - 1} ${L} ${f} ${L - 3}C${f + 1} ${L - 6} ${hw + 3} ${L - 10} ${hw} ${L - 12}V0`;
  const t = hw / 10;
  // fur edge: small zig-zag so the sock line reads as fur but stays crisp
  const zig = [7, 4, 1, -2, -5, -8].map((v, i) => `L${v * t} ${s + (i % 2 ? 1 : 3)}`).join("");
  const fur = `M${-hw} -3H${hw}V${s + 1}${zig}L${-hw} ${s + 2}Z`;
  const toe = (f - 1) * 0.66;

  return (
    <g transform={`translate(${x} ${y})${rotate ? ` rotate(${rotate})` : ""}`}>
      <path className="c-sock" d={`${sides}Z`} />
      {s > 0 && <path className="c-fur" d={fur} />}
      {spots && s > 12 && (
        <g className="c-spot">
          <ellipse
            cx={-0.4 * hw}
            cy={s * 0.35}
            rx="3.2"
            ry="1.6"
            transform={`rotate(-12 ${-0.4 * hw} ${s * 0.35})`}
          />
          <ellipse
            cx={0.45 * hw}
            cy={s * 0.62}
            rx="3"
            ry="1.5"
            transform={`rotate(10 ${0.45 * hw} ${s * 0.62})`}
          />
          <ellipse cx={-0.3 * hw} cy={s * 0.86} rx="2.4" ry="1.3" />
        </g>
      )}
      <g className="c-bean" opacity=".85">
        <ellipse cx={-toe * 1.35} cy={L - 1.3} rx="3" ry="1.2" />
        <ellipse cx="0" cy={L - 1.1} rx="3" ry="1.2" />
        <ellipse cx={toe * 1.35} cy={L - 1.3} rx="3" ry="1.2" />
      </g>
      <path
        className="c-line-thin"
        fill="none"
        d={`M${-toe * 0.68} ${L - 7}V${L - 0.5}M${toe * 0.68} ${L - 7}V${L - 0.5}`}
      />
      <path className="c-line" fill="none" d={sides} />
    </g>
  );
}

/** A paw tucked under the body: just the white mitten with toe splits. */
export function Mitten({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        className="c-sock c-line"
        d="M-14 2C-14 -6 -8 -9 0 -9S14 -6 14 2C14 7 9 8 0 8S-14 7 -14 2Z"
      />
      <path className="c-line-thin" fill="none" d="M-4.5 2V8M4.5 2V8" />
      <g className="c-bean" opacity=".85">
        <ellipse cx="-9" cy="7" rx="3" ry="1.1" />
        <ellipse cx="0" cy="7.3" rx="3" ry="1.1" />
        <ellipse cx="9" cy="7" rx="3" ry="1.1" />
      </g>
    </g>
  );
}

/* ---------------- Ringed tabby tail ---------------- */

export function Tail({ d }: { d: string }) {
  return (
    <g>
      <path className="c-tail-outline" d={d} />
      <path className="c-tail-fur" d={d} />
      <path className="c-tail-rings" d={d} />
    </g>
  );
}

/** Small stripe strokes for bodies. */
export function Stripes({ d }: { d: string }) {
  return <path className="c-stripe" d={d} />;
}
