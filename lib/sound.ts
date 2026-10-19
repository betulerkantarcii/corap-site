/**
 * Tiny synthesized sound effects (Web Audio) — no audio files to download.
 * Callers must check the visitor's sound preference first; sound is OFF by default.
 */
let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function envelope(a: AudioContext, peak: number, attack: number, release: number) {
  const g = a.createGain();
  const t = a.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  g.connect(a.destination);
  return g;
}

/** Soft rumbling purr: filtered noise pulsing ~25 times a second. */
export function purr(seconds = 2.2) {
  const a = audio();
  if (!a) return;
  const len = Math.floor(a.sampleRate * seconds);
  const buf = a.createBuffer(1, len, a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const pulse = 0.55 + 0.45 * Math.sin((2 * Math.PI * 25 * i) / a.sampleRate);
    data[i] = (Math.random() * 2 - 1) * pulse;
  }
  const src = a.createBufferSource();
  src.buffer = buf;
  const lp = a.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 180;
  const g = a.createGain();
  const t = a.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.5, t + 0.3);
  g.gain.setValueAtTime(0.5, t + seconds - 0.5);
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
  src.connect(lp).connect(g).connect(a.destination);
  src.start();
}

/** Little "pop" for catches and clicks. */
export function pop(pitch = 660) {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(pitch, a.currentTime);
  o.frequency.exponentialRampToValueAtTime(pitch * 1.8, a.currentTime + 0.08);
  o.connect(envelope(a, 0.18, 0.005, 0.12));
  o.start();
  o.stop(a.currentTime + 0.15);
}

/** Low "boop" for a miss / cucumber. */
export function boop() {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(220, a.currentTime);
  o.frequency.exponentialRampToValueAtTime(110, a.currentTime + 0.25);
  o.connect(envelope(a, 0.2, 0.01, 0.28));
  o.start();
  o.stop(a.currentTime + 0.3);
}

/** A short synthesized "mrrp?" — rising then falling glide. */
export function meow() {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(420, t);
  o.frequency.linearRampToValueAtTime(820, t + 0.12);
  o.frequency.linearRampToValueAtTime(560, t + 0.42);
  const bp = a.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1100;
  bp.Q.value = 4;
  o.connect(bp).connect(envelope(a, 0.12, 0.04, 0.4));
  o.start();
  o.stop(t + 0.5);
}
