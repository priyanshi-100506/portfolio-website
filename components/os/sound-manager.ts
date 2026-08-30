import React from "react";

// Pure Web Audio API synth — no external files.
// Works client-side only; silently no-ops on server.
let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!_ctx) {
    _ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (_ctx.state === "suspended") _ctx.resume();
  return _ctx;
}

function beep(
  freq: number,
  duration: number,
  volume = 0.07,
  type: OscillatorType = "square"
) {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    /* silently ignore — AudioContext may be blocked */
  }
}

// ── Sound catalogue ──────────────────────────────────────────────────────────

const SOUNDS = {
  click:    () => beep(700, 0.04, 0.06, "square"),
  open:     () => { beep(420, 0.07, 0.07, "square"); setTimeout(() => beep(630, 0.07, 0.07, "square"), 65); },
  close:    () => { beep(500, 0.06, 0.06, "square"); setTimeout(() => beep(320, 0.08, 0.06, "square"), 55); },
  minimize: () => beep(480, 0.05, 0.05, "square"),
  maximize: () => beep(560, 0.06, 0.06, "square"),
  error:    () => { beep(220, 0.1, 0.09, "sawtooth"); setTimeout(() => beep(180, 0.12, 0.08, "sawtooth"), 100); },
  boot:     () => { [300, 400, 560, 700].forEach((f, i) => setTimeout(() => beep(f, 0.1, 0.06, "square"), i * 80)); },
};

// ── Module-level enabled flag (avoids context overhead) ──────────────────────

let _enabled = true;

if (typeof window !== "undefined") {
  _enabled = localStorage.getItem("os-sound") !== "false";
}

export function isSoundEnabled(): boolean { return _enabled; }

export function setSoundEnabled(v: boolean): void {
  _enabled = v;
  if (typeof window !== "undefined") {
    localStorage.setItem("os-sound", String(v));
    window.dispatchEvent(new Event("os-sound-change"));
  }
}

export function useSoundEnabled() {
  const [enabled, setEnabled] = React.useState(isSoundEnabled);
  React.useEffect(() => {
    const handle = () => setEnabled(isSoundEnabled());
    window.addEventListener("os-sound-change", handle);
    return () => window.removeEventListener("os-sound-change", handle);
  }, []);
  return enabled;
}

export function playSound(name: keyof typeof SOUNDS): void {
  if (!_enabled) return;
  SOUNDS[name]?.();
}
