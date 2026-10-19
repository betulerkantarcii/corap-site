"use client";

// Internal dev tool: copy is English-only on purpose (not part of the public site).
import { useState, type ReactNode } from "react";
import { Corap, type Mood, type Pose } from "@/components/mascot/Corap";
import { Logo, SockPawsMark } from "@/components/ui/Logo";
import { BeanPaw, PawOutline, PawPrint, PawTrail, SockIcon, YarnBall } from "@/components/ui/icons";

const POSES: { pose: Pose; note: string }[] = [
  { pose: "sit", note: "Hero. Breathes, blinks, twitches ears, swishes tail. Hover = slow blink." },
  { pose: "peek", note: "Peeking over an edge (the bottom of the box)." },
  { pose: "sleep", note: "Curled up, eyes shut, zzz. Footer + night-time hero." },
  { pose: "stretch", note: "Big stretch. Footer wake-up." },
  { pose: "pounce", note: "Butt wiggle → leap. Mini-game + 404." },
];
const MOODS: Mood[] = ["neutral", "happy", "sleepy", "mischief"];

export function MascotPlayground() {
  const [dark, setDark] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [follow, setFollow] = useState(true);
  const [purring, setPurring] = useState(false);
  const [mood, setMood] = useState<Mood>("neutral");
  const [stage, setStage] = useState<Pose>("sit");

  const surface = dark ? "section-night" : "section-sock";
  const card = dark ? "bg-night-soft" : "bg-sock-cream";
  const common = { animated, purring, lookAt: follow ? ("cursor" as const) : null };

  return (
    <div className={`${surface} paper-grain min-h-dvh`}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Mascot preview</h1>
        <p className="mt-2 opacity-80">
          <code>{`<Corap pose mood lookAt animated purring interactive title />`}</code>
        </p>

        <fieldset className="mt-6 flex flex-wrap items-center gap-2">
          <legend className="sr-only">Preview controls</legend>
          <Toggle on={dark} set={setDark} label="Night background" />
          <Toggle on={animated} set={setAnimated} label="Animated" />
          <Toggle on={follow} set={setFollow} label="Eyes follow cursor" />
          <Toggle on={purring} set={setPurring} label="Purring" />
          <label className="ml-1 flex items-center gap-2 text-sm font-semibold">
            Mood
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value as Mood)}
              className="rounded-full bg-sock-white px-3 py-2 text-night"
            >
              {MOODS.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
        </fieldset>

        <Section title="Stage">
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Stage pose">
            {POSES.map(({ pose }) => (
              <Toggle key={pose} on={stage === pose} set={() => setStage(pose)} label={pose} />
            ))}
          </div>
          <div className={`${card} flex justify-center rounded-blob p-6 sm:p-10`}>
            <Corap
              pose={stage}
              mood={mood}
              {...common}
              title={`Çorap, ${stage} pose`}
              className={`max-h-[60vh] w-full ${stage === "sit" ? "max-w-md" : "max-w-2xl"}`}
            />
          </div>
        </Section>

        <Section title="Poses">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POSES.map(({ pose, note }) => (
              <figure key={pose} className={`${card} flex flex-col rounded-blob p-5`}>
                <div className="flex flex-1 items-end justify-center">
                  <Corap
                    pose={pose}
                    mood={mood}
                    {...common}
                    title={`Çorap, ${pose} pose`}
                    className={`w-full ${pose === "sit" ? "max-w-56" : "max-w-72"}`}
                  />
                </div>
                <figcaption className="mt-4">
                  <span className="font-display text-lg font-semibold">{pose}</span>
                  <span className="block text-sm opacity-75">{note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Moods (sit)">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {MOODS.map((m) => (
              <figure key={m} className={`${card} rounded-blob p-4 text-center`}>
                <Corap mood={m} {...common} className="mx-auto w-full max-w-40" />
                <figcaption className="mt-2 font-display font-semibold">{m}</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Logo">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="section-night flex items-center justify-center rounded-blob p-8">
              <Logo className="scale-150" />
            </div>
            <div className="section-sock flex items-center justify-center rounded-blob p-8">
              <Logo tone="dark" className="scale-150" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-end gap-6">
            <SockPawsMark className="h-24 w-auto" />
            {[16, 32, 64, 128].map((s) => (
              <figure key={s} className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- previewing the raw favicon */}
                <img src="/icon.svg" width={s} height={s} alt={`Favicon at ${s}px`} />
                <figcaption className="mt-1 text-xs opacity-75">{s}px</figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Paw icon set">
          <ul className="flex flex-wrap items-center gap-6">
            {[
              ["PawPrint", <PawPrint key="a" className="h-10 w-10 text-bean-pink" />],
              ["PawOutline", <PawOutline key="b" className="h-10 w-10 text-tabby-caramel" />],
              ["BeanPaw", <BeanPaw key="c" className="h-12 w-12" />],
              ["SockIcon", <SockIcon key="d" className="h-12 w-12" />],
              ["YarnBall", <YarnBall key="e" className="h-12 w-12" />],
              ["PawTrail", <PawTrail key="f" className="h-8 w-32 text-tabby-caramel" />],
            ].map(([name, icon]) => (
              <li key={name as string} className="flex flex-col items-center gap-2">
                {icon}
                <code className="text-xs opacity-75">{name}</code>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Toggle({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => set(!on)}
      className={`bean-press rounded-full border-2 px-4 py-2 text-sm font-semibold ${
        on ? "border-bean-pink bg-bean-pink text-night" : "border-current"
      }`}
    >
      {label}
    </button>
  );
}
