"use client";

import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { useSfx } from "@/components/delight/DelightProvider";
import { Corap } from "@/components/mascot/Corap";
import { SockIcon, YarnBall } from "@/components/ui/icons";
import { site } from "@/content/site";
import { GAME_SECONDS } from "@/lib/game";
import { boop, meow, pop } from "@/lib/sound";

/* ------------------------------------------------------------------
   Catch the Sock — a 25-second catching game. Pure DOM/SVG, no canvas.
   Positions are fractions of the arena (0–1) so it scales to any size.
   Controls: pointer/touch drag, ←/→ (or A/D) keys.
   ------------------------------------------------------------------ */

const PLAYER_W = 0.26; // catch width (fraction of arena)
const CATCH_TOP = 0.78;
const CATCH_BOTTOM = 0.93;
const POINTS = { sock: 1, yarn: 3, cucumber: -2 } as const;

type Kind = keyof typeof POINTS;
type Item = { id: number; kind: Kind; x: number; y: number; vy: number; rot: number; vr: number };
type Pop = { id: number; x: number; y: number; text: string; bad: boolean; born: number };
type Phase = "playing" | "over";

export default function CatchTheSock() {
  const t = useTranslations("Game");
  const sfx = useSfx();
  const arena = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [, setFrame] = useState(0);
  const [startedAt, setStartedAt] = useState(0); // bump to restart

  const s = useRef({
    items: [] as Item[],
    pops: [] as Pop[],
    x: 0.5,
    target: 0.5,
    keys: { left: false, right: false },
    elapsed: 0,
    lastSpawn: 0,
    score: 0,
    scaredUntil: 0,
    nextId: 0,
  });

  const start = useCallback(() => {
    Object.assign(s.current, {
      items: [],
      pops: [],
      x: 0.5,
      target: 0.5,
      elapsed: 0,
      lastSpawn: 0,
      score: 0,
      scaredUntil: 0,
    });
    setPhase("playing");
    setStartedAt((n) => n + 1);
    arena.current?.focus();
  }, []);

  // Game loop. requestAnimationFrame pauses in background tabs; dt is clamped so
  // returning to the tab doesn't teleport anything.
  useEffect(() => {
    if (phase !== "playing") return;
    arena.current?.focus();
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const g = s.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      g.elapsed += dt;

      if (g.keys.left) g.target = Math.max(0.08, g.target - 1.15 * dt);
      if (g.keys.right) g.target = Math.min(0.92, g.target + 1.15 * dt);
      g.x += (g.target - g.x) * Math.min(1, dt * 14);

      const interval = Math.max(0.36, 0.85 - g.elapsed * 0.02);
      if (g.elapsed - g.lastSpawn > interval) {
        g.lastSpawn = g.elapsed;
        const r = Math.random();
        const kind: Kind = r < 0.14 ? "cucumber" : r < 0.22 ? "yarn" : "sock";
        g.items.push({
          id: g.nextId++,
          kind,
          x: 0.07 + Math.random() * 0.86,
          y: -0.08,
          vy: (0.3 + g.elapsed * 0.012 + Math.random() * 0.12) * (kind === "yarn" ? 1.35 : 1),
          rot: Math.random() * 360,
          vr: (Math.random() - 0.5) * 360,
        });
      }

      g.items = g.items.filter((it) => {
        it.y += it.vy * dt;
        it.rot += it.vr * dt;
        if (it.y > CATCH_TOP && it.y < CATCH_BOTTOM && Math.abs(it.x - g.x) < PLAYER_W / 2) {
          const pts = POINTS[it.kind];
          g.score = Math.max(0, g.score + pts);
          g.pops.push({
            id: it.id,
            x: it.x,
            y: CATCH_TOP - 0.06,
            text: pts > 0 ? `+${pts}` : `${pts}`,
            bad: pts < 0,
            born: g.elapsed,
          });
          if (pts < 0) {
            g.scaredUntil = g.elapsed + 0.7;
            sfx(boop);
          } else sfx(() => pop(pts > 1 ? 880 : 660));
          return false;
        }
        return it.y < 1.1;
      });
      g.pops = g.pops.filter((p) => g.elapsed - p.born < 0.7);

      if (g.elapsed >= GAME_SECONDS) {
        setPhase("over");
        sfx(meow);
        return;
      }
      setFrame((f) => f + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase, startedAt, sfx]);

  const aim = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    s.current.target = Math.min(0.92, Math.max(0.08, (e.clientX - r.left) / r.width));
  };
  const key = (e: KeyboardEvent<HTMLDivElement>, down: boolean) => {
    const k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") s.current.keys.left = down;
    else if (k === "arrowright" || k === "d") s.current.keys.right = down;
    else if (down && phase === "over" && (k === "enter" || k === " ")) start();
    else return;
    e.preventDefault();
  };

  const g = s.current;
  const left = Math.max(0, Math.ceil(GAME_SECONDS - g.elapsed));
  const scared = g.elapsed < g.scaredUntil;

  return (
    <div
      ref={arena}
      tabIndex={0}
      role="application"
      aria-label={t("area")}
      onPointerDown={aim}
      onPointerMove={aim}
      onKeyDown={(e) => key(e, true)}
      onKeyUp={(e) => key(e, false)}
      className="section-night paper-grain relative aspect-[3/4] w-full touch-none overflow-hidden rounded-blob select-none sm:aspect-[4/3]"
    >
      {/* HUD */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 flex justify-between p-4 font-display font-semibold"
      >
        <span className="rounded-full bg-sock-white/10 px-3 py-1">
          {t("score")}: <span className="text-bean-pink">{g.score}</span>
        </span>
        <span className="rounded-full bg-sock-white/10 px-3 py-1 tabular-nums">
          {t("time")}: {left}s
        </span>
      </div>

      {g.items.map((it) => {
        const Icon = it.kind === "sock" ? SockIcon : it.kind === "yarn" ? YarnBall : Cucumber;
        return (
          <div
            key={it.id}
            aria-hidden="true"
            className="absolute w-[11%] max-w-14"
            style={{
              left: `${it.x * 100}%`,
              top: `${it.y * 100}%`,
              transform: `translate(-50%, -50%) rotate(${it.rot}deg)`,
            }}
          >
            <Icon className="h-auto w-full" />
          </div>
        );
      })}

      {g.pops.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={`absolute z-10 -translate-x-1/2 font-display text-xl font-bold ${p.bad ? "text-[#9fd17a]" : "text-bean-pink"}`}
          style={{
            left: `${p.x * 100}%`,
            top: `${(p.y - (g.elapsed - p.born) * 0.12) * 100}%`,
            opacity: 1 - (g.elapsed - p.born) / 0.7,
          }}
        >
          {p.text}
        </span>
      ))}

      {/* Çorap: her paws are the catch zone */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 ${scared ? "animate-[game-shake_.2s_linear_3]" : ""}`}
        style={{
          left: `${g.x * 100}%`,
          width: `${PLAYER_W * 100 + 4}%`,
          transform: "translateX(-50%)",
        }}
      >
        <Corap
          pose="peek"
          mood={scared ? "mischief" : "happy"}
          interactive={false}
          className="w-full"
        />
      </div>

      {phase === "over" && <Results score={g.score} onAgain={start} />}
    </div>
  );
}

function Results({ score, onAgain }: { score: number; onAgain: () => void }) {
  const t = useTranslations("Game");
  const [note, setNote] = useState("");
  const tier = score >= 20 ? "tierHigh" : score >= 10 ? "tierMid" : "tierLow";
  const reward =
    site.gameReward.code && score >= site.gameReward.minScore ? site.gameReward.code : null;

  const share = async () => {
    const text = t("shareText", { count: score });
    const url = window.location.origin + window.location.pathname;
    try {
      if (navigator.share) await navigator.share({ text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setNote(t("shareCopied"));
      }
    } catch {
      /* share sheet dismissed */
    }
  };
  const copy = async () => {
    if (!reward) return;
    await navigator.clipboard.writeText(reward).catch(() => {});
    setNote(t("copied"));
  };

  return (
    <div className="absolute inset-0 z-30 grid place-items-center bg-night/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-blob bg-sock-white p-6 text-center text-tabby-spot shadow-xl">
        <Corap
          pose={score >= 10 ? "sit" : "sleep"}
          mood="happy"
          interactive={false}
          className="mx-auto h-28 w-auto"
        />
        <p role="status" className="mt-3 font-display text-3xl font-semibold">
          {t("result", { count: score })}
        </p>
        <p className="mt-1 text-tabby-brown">{t(tier)}</p>

        {reward && (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-bean-pink-deep p-3">
            <p className="text-sm font-semibold text-caramel-ink">{t("rewardTitle")}</p>
            <p className="text-sm text-tabby-brown">{t("rewardBody")}</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-widest">{reward}</p>
            <button
              type="button"
              onClick={copy}
              className="bean-press mt-2 min-h-10 rounded-full bg-tabby-spot px-4 text-sm font-semibold text-sock-white"
            >
              {t("copy")}
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={onAgain}
            className="bean-press min-h-11 rounded-full bg-bean-pink px-5 font-display font-semibold text-night hover:bg-bean-pink-deep"
          >
            {t("playAgain")}
          </button>
          <button
            type="button"
            onClick={share}
            className="bean-press min-h-11 rounded-full border-2 border-tabby-brown px-5 font-display font-semibold text-tabby-brown hover:bg-tabby-brown hover:text-sock-white"
          >
            {t("share")}
          </button>
        </div>
        <p className="mt-2 min-h-5 text-sm text-caramel-ink" aria-live="polite">
          {note}
        </p>
      </div>
    </div>
  );
}

function Cucumber({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g transform="rotate(-35 20 20)">
        <rect
          x="6"
          y="14"
          width="28"
          height="12"
          rx="6"
          fill="#5f8f3e"
          stroke="#2e1f15"
          strokeWidth="1.6"
        />
        <path
          d="M11 18h3M18 22h3M25 18h3"
          stroke="#9fd17a"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
