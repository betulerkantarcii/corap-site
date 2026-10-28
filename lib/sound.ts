/**
 * Tiny synthesized sound effects (Web Audio) — no audio files to download.
 * Callers must check the visitor's sound preference first; sound is OFF by default.
 *
 * Browsers only let audio start inside a click/tap/keypress, so the context is
 * created and resumed by `unlockAudio()` from such a gesture (the sound toggle,
 * or the visitor's first click). After that, sounds triggered by hovering,
 * stroking or the game loop play normally.
 */
let ctx: AudioContext | null = null;
let master: AudioNode | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    ctx = new AudioContext();
    // A gentle compressor lets everything be a bit louder without clipping.
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 4;
    comp.connect(ctx.destination);
    master = comp;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const out = (a: AudioContext) => master ?? a.destination;

/**
 * Call from a click/tap/keypress handler. Creates and resumes the audio
 * context while the browser allows it, and on iPhone asks to play even when
 * the ring/silent switch is on (where Safari supports it).
 */
export function unlockAudio() {
  try {
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = "playback";
  } catch {
    /* not supported — fine */
  }
  const a = audio();
  if (!a) return;
  // A silent one-sample buffer completes the unlock on older iOS Safari.
  const src = a.createBufferSource();
  src.buffer = a.createBuffer(1, 1, a.sampleRate);
  src.connect(out(a));
  src.start();
}

function envelope(a: AudioContext, peak: number, attack: number, release: number) {
  const g = a.createGain();
  const t = a.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  g.connect(out(a));
  return g;
}

/**
 * Purr: noise pulsing ~25 times a second, shaped into the 150–900 Hz range so
 * laptop and phone speakers (which can't play deep bass) actually reproduce it.
 */
export function purr(seconds = 2.2) {
  const a = audio();
  if (!a) return;
  const len = Math.floor(a.sampleRate * seconds);
  const buf = a.createBuffer(1, len, a.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    // sharp-ish pulse (raised sine) = the "rrrr" texture of a purr
    const phase = Math.sin((2 * Math.PI * 25 * i) / a.sampleRate);
    const pulse = Math.pow(Math.max(0, phase), 2) * 0.85 + 0.15;
    data[i] = (Math.random() * 2 - 1) * pulse;
  }
  const src = a.createBufferSource();
  src.buffer = buf;
  const hp = a.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 150;
  const lp = a.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  const g = a.createGain();
  const t = a.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.9, t + 0.25);
  g.gain.setValueAtTime(0.9, t + seconds - 0.5);
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
  src.connect(hp).connect(lp).connect(g).connect(out(a));
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
  o.connect(envelope(a, 0.3, 0.005, 0.12));
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
  o.connect(envelope(a, 0.3, 0.01, 0.28));
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
  o.connect(bp).connect(envelope(a, 0.35, 0.04, 0.4));
  o.start();
  o.stop(t + 0.5);
}
