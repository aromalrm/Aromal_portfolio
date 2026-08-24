"use client";

import { useEffect, useRef, useState } from "react";

// Sprites: CraftPix.net "Free Shinobi Sprites Pixel Art" (Samurai set).
// Each sprite sheet is a horizontal strip of 128×128 frames.

type SamuraiState = "idle" | "walk" | "run" | "attack" | "attack2" | "jump";

const SPRITES: Record<SamuraiState, { file: string; frames: number; fps: number }> = {
  idle: { file: "Idle.png", frames: 6, fps: 8 },
  walk: { file: "Walk.png", frames: 8, fps: 10 },
  run: { file: "Run.png", frames: 8, fps: 12 },
  attack: { file: "Attack_1.png", frames: 6, fps: 12 },
  attack2: { file: "Attack_2.png", frames: 4, fps: 12 },
  jump: { file: "Jump.png", frames: 12, fps: 12 },
};

// Play once and return to idle, rather than looping.
const ONE_SHOT_STATES: SamuraiState[] = ["attack", "attack2", "jump"];

const RUN_DISTANCE = 260; // px — beyond this, sprint to catch up
const IDLE_DISTANCE = 24; // px — close enough to the cursor to stop
const WALK_SPEED = 140; // px/sec
const RUN_SPEED = 320; // px/sec
const FLOURISH_DELAY = 3000; // ms standing still before dancing/fighting

interface SamuraiProps {
  /** Rendered pixel size of the (square) sprite. Default 96. */
  size?: number;
}

export function Samurai({ size = 96 }: SamuraiProps) {
  const [state, setState] = useState<SamuraiState>("idle");
  const [frame, setFrame] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [facingLeft, setFacingLeft] = useState(false);

  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef<SamuraiState>("idle");
  const idleSinceRef = useRef(0);
  const performingRef = useRef(false);

  // Start centered and track the cursor from then on.
  useEffect(() => {
    const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    posRef.current = start;
    targetRef.current = start;
    setPos(start);
    idleSinceRef.current = performance.now();

    function handleMove(e: MouseEvent) {
      targetRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Chase the cursor every frame; once caught up and idle for a while, throw
  // in a random attack/jump flourish before settling back down.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let lastTs: number | null = null;

    function tick(ts: number) {
      if (lastTs === null) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      if (performingRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - (posRef.current.y + size / 2);
      const dist = Math.hypot(dx, dy);

      let next: SamuraiState = "idle";
      if (dist > RUN_DISTANCE) next = "run";
      else if (dist > IDLE_DISTANCE) next = "walk";

      if (next !== "idle") {
        const speed = next === "run" ? RUN_SPEED : WALK_SPEED;
        const step = Math.min(speed * dt, dist);
        posRef.current = {
          x: posRef.current.x + (dx / dist) * step,
          y: posRef.current.y + (dy / dist) * step,
        };
        setPos(posRef.current);
        if (Math.abs(dx) > 2) setFacingLeft(dx < 0);
        idleSinceRef.current = ts;
      } else if (stateRef.current !== "idle") {
        idleSinceRef.current = ts;
      } else if (ts - idleSinceRef.current > FLOURISH_DELAY) {
        const flourishes: SamuraiState[] = ["attack", "attack2", "jump"];
        next = flourishes[Math.floor(Math.random() * flourishes.length)];
        performingRef.current = true;
      }

      if (next !== stateRef.current) {
        stateRef.current = next;
        setState(next);
        setFrame(0);
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [size]);

  // Cycle the sprite frames for whichever action is currently active.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sprite = SPRITES[state];
    const oneShot = ONE_SHOT_STATES.includes(state);

    const interval = setInterval(() => {
      setFrame((f) => {
        const next = f + 1;
        if (next >= sprite.frames) {
          if (oneShot) {
            performingRef.current = false;
            stateRef.current = "idle";
            idleSinceRef.current = performance.now();
            setState("idle");
          }
          return 0;
        }
        return next;
      });
    }, 1000 / sprite.fps);

    return () => clearInterval(interval);
  }, [state]);

  const sprite = SPRITES[state];

  return (
    <div
      className="fixed top-0 left-0 z-40 pointer-events-none select-none"
      style={{
        transform: `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px) scaleX(${
          facingLeft ? -1 : 1
        })`,
        width: size,
        height: size,
      }}
    >
      <div
        role="img"
        aria-label={`Animated samurai character — ${state}`}
        style={{
          width: size,
          height: size,
          backgroundImage: `url(/images/samurai/${sprite.file})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${sprite.frames * size}px ${size}px`,
          backgroundPosition: `-${frame * size}px 0px`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
