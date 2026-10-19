"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Corap } from "@/components/mascot/Corap";
import { meow } from "@/lib/sound";
import { useDelight, useSfx } from "./DelightProvider";

type Edge = "bottom" | "left" | "right";
type Peek = { edge: Edge; at: number; shown: boolean };

const W = 150; // cat width in px (peek pose is 200×124)
const H = Math.round((W * 124) / 200);
const FIRST_DELAY = [12_000, 20_000];
const EVERY = [25_000, 45_000];
const STAY = 5_000;
const SHY_RADIUS = 170;

const rand = ([a, b]: number[]) => a + Math.random() * (b - a);

/**
 * Every so often Çorap peeks in from the bottom, left or right edge of the
 * screen, then ducks away — immediately if the cursor comes close. Desktop
 * only (needs a mouse), off in calm / reduced motion. Decorative.
 */
export function PeekingCorap() {
  const { motionOK } = useDelight();
  const sfx = useSfx();
  const [peek, setPeek] = useState<Peek | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionOK || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let timer = 0;
    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        if (document.hidden) return schedule(rand(EVERY));
        const edges: Edge[] = ["bottom", "left", "right"];
        const edge = edges[Math.floor(Math.random() * edges.length)];
        setPeek({ edge, at: 15 + Math.random() * 65, shown: false });
        requestAnimationFrame(() => setPeek((p) => p && { ...p, shown: true }));
        timer = window.setTimeout(() => {
          setPeek((p) => p && { ...p, shown: false });
          schedule(rand(EVERY));
        }, STAY);
      }, delay);
    };
    schedule(rand(FIRST_DELAY));
    return () => window.clearTimeout(timer);
  }, [motionOK]);

  // Shy: hide when the cursor approaches.
  useEffect(() => {
    if (!peek?.shown) return;
    const onMove = (e: PointerEvent) => {
      const r = box.current?.getBoundingClientRect();
      if (!r) return;
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (d < SHY_RADIUS) setPeek((p) => p && { ...p, shown: false });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [peek?.shown]);

  if (!peek) return null;

  // Wrapper sits on the edge; the cat is rotated so her "bottom" faces that edge.
  const wrap: Record<Edge, CSSProperties> = {
    bottom: { bottom: 0, left: `${peek.at}vw`, width: W, height: H },
    left: { left: 0, top: `${peek.at}vh`, width: H, height: W },
    right: { right: 0, top: `${peek.at}vh`, width: H, height: W },
  };
  const hidden: Record<Edge, string> = {
    bottom: "translateY(105%)",
    left: "translateX(-105%)",
    right: "translateX(105%)",
  };
  const inner: Record<Edge, string> = {
    bottom: "none",
    left: `translateX(${H}px) rotate(90deg)`,
    right: `translateY(${W}px) rotate(-90deg)`,
  };

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="fixed z-50 transition-transform duration-500 ease-squish"
      style={{ ...wrap[peek.edge], transform: peek.shown ? "none" : hidden[peek.edge] }}
      onClick={() => {
        sfx(meow);
        setPeek((p) => p && { ...p, shown: false });
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: W, height: H, transform: inner[peek.edge] }}
      >
        <Corap
          pose="peek"
          mood="mischief"
          lookAt="cursor"
          interactive={false}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
