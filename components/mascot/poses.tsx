import type { CSSProperties, ReactNode } from "react";
import { Head, Leg, Mitten, Stripes, Tail, type PupilShape } from "./parts";

export type HeadConfig = { uid: string; pupil: PupilShape; cheeks: boolean };

type PoseDef = {
  viewBox: string;
  render: (head: HeadConfig) => ReactNode;
};

/** Positions a head; the inner <g> is free for CSS animation. */
function PlacedHead({ t, head }: { t: string; head: HeadConfig }) {
  return (
    <g transform={t}>
      <g className="corap-head">
        <Head {...head} />
      </g>
    </g>
  );
}

function AnimatedTail({ d, origin }: { d: string; origin: string }) {
  return (
    <g className="corap-tail" style={{ "--tail-origin": origin } as CSSProperties}>
      <Tail d={d} />
    </g>
  );
}

/* ---------- sit: the hero pose ---------- */
const sit: PoseDef = {
  viewBox: "0 0 200 214",
  render: (head) => (
    <>
      <AnimatedTail d="M124 200C158 206 182 190 180 162C179 146 170 134 158 128" origin="0% 92%" />
      <g className="corap-breathe">
        <path
          className="c-fur c-line"
          d="M70 204C58 176 60 136 80 112H120C140 136 142 176 130 204C118 210 82 210 70 204Z"
        />
        <path className="c-sock" d="M84 112C80 140 86 168 100 177C114 168 120 140 116 112Z" />
        <Stripes d="M66 140Q74 138 77 146M64 158Q71 156 74 164M134 140Q126 138 123 146M136 158Q129 156 126 164" />
        {/* white hind feet, then haunches overlapping them */}
        <ellipse className="c-sock c-line" cx="66" cy="204" rx="12" ry="5.5" />
        <ellipse className="c-sock c-line" cx="134" cy="204" rx="12" ry="5.5" />
        <path className="c-fur c-line" d="M60 204C50 194 52 166 70 160C82 160 88 180 84 204Z" />
        <path
          className="c-fur c-line"
          d="M140 204C150 194 148 166 130 160C118 160 112 180 116 204Z"
        />
        <Stripes d="M57 182Q64 177 70 184M143 182Q136 177 130 184" />
        <Leg x={88} y={146} length={60} hw={9} />
        <Leg x={112} y={146} length={60} hw={9} />
      </g>
      <PlacedHead t="translate(100 76)" head={head} />
    </>
  ),
};

/* ---------- peek: head + paws over the bottom edge ---------- */
const peek: PoseDef = {
  viewBox: "0 0 200 124",
  render: (head) => (
    <>
      <PlacedHead t="translate(100 88)" head={head} />
      {/* bare wrappers so CSS can animate kneading */}
      <g className="corap-paw corap-paw-l">
        <Mitten x={60} y={116} rotate={-4} />
      </g>
      <g className="corap-paw corap-paw-r">
        <Mitten x={140} y={116} rotate={4} />
      </g>
    </>
  ),
};

/* ---------- sleep: curled loaf with zzz ---------- */
const sleep: PoseDef = {
  viewBox: "0 0 220 136",
  render: (head) => (
    <>
      <g className="corap-breathe corap-breathe-slow">
        <ellipse className="c-fur c-line" cx="122" cy="92" rx="84" ry="38" />
        <Stripes d="M72 60Q76 68 74 76M96 55Q99 64 97 72M121 54Q123 63 121 71M146 56Q147 65 144 73M170 62Q170 70 166 77" />
        <path
          className="c-fur c-line"
          d="M146 122C136 100 146 74 172 72C194 72 206 92 200 112C196 124 186 128 170 128Z"
        />
        <Stripes d="M178 80Q182 88 180 95M192 88Q194 96 190 102" />
      </g>
      <Tail d="M198 108C198 134 140 136 84 126" />
      <Mitten x={98} y={118} rotate={-6} />
      <PlacedHead t="translate(64 82) rotate(-14) scale(.92)" head={head} />
      <g className="corap-zzz" fill="currentColor" aria-hidden="true">
        <text x="20" y="34" fontSize="11">
          z
        </text>
        <text x="30" y="22" fontSize="14">
          z
        </text>
        <text x="42" y="8" fontSize="17">
          Z
        </text>
      </g>
    </>
  ),
};

/* ---------- stretch: front paws forward, rump up ---------- */
const stretch: PoseDef = {
  viewBox: "0 0 260 168",
  render: (head) => (
    <>
      <AnimatedTail d="M214 80C232 66 242 44 232 24C228 16 220 14 214 18" origin="0% 100%" />
      <g className="corap-breathe">
        <Leg x={188} y={100} length={62} />
        <Leg x={208} y={96} length={66} />
        <path
          className="c-fur c-line"
          d="M84 130C80 112 104 104 128 100C150 96 166 72 196 70C222 70 230 92 222 112C214 126 196 126 180 122C156 118 124 138 100 142C88 142 84 138 84 130Z"
        />
        <Stripes d="M128 98Q132 105 130 111M150 85Q156 91 154 99M172 74Q176 82 174 90M196 70Q198 80 194 88" />
      </g>
      <Leg x={96} y={124} length={74} rotate={72} hw={9} />
      <Leg x={108} y={130} length={72} rotate={68} hw={9} />
      <PlacedHead t="translate(112 92) rotate(-6) scale(.92)" head={head} />
    </>
  ),
};

/* ---------- pounce: low crouch, butt wiggle, leap ---------- */
const pounce: PoseDef = {
  viewBox: "0 0 260 156",
  render: (head) => (
    <g className="corap-leap">
      <AnimatedTail d="M210 118C234 120 246 108 250 92" origin="0% 100%" />
      <path
        className="c-fur c-line"
        d="M76 122C82 100 120 92 160 90C190 88 214 96 214 116C214 134 196 142 176 142L92 146C76 146 70 136 76 122Z"
      />
      <Stripes d="M118 94Q120 102 116 108M142 91Q144 99 140 105" />
      <g className="corap-wiggle">
        <path
          className="c-fur c-line"
          d="M168 144C160 122 172 100 194 100C214 102 222 124 214 144C204 150 178 150 168 144Z"
        />
        <Stripes d="M184 108Q188 116 186 123M200 106Q203 114 200 121" />
        <ellipse className="c-sock c-line" cx="168" cy="146" rx="13" ry="5.5" />
      </g>
      <Leg x={94} y={124} length={24} sockAt={0.25} spots={false} hw={9} />
      <Leg x={114} y={126} length={22} sockAt={0.25} spots={false} hw={9} />
      <PlacedHead t="translate(72 92) scale(.95)" head={head} />
    </g>
  ),
};

export const POSES = { sit, peek, sleep, stretch, pounce } as const;
export type Pose = keyof typeof POSES;
