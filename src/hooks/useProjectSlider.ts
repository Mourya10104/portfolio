"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { gsap } from "@/lib/gsap";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const WHEEL_SPEED = 1.5;
const DRAG_SPEED = 1.8;
/** Idle time after the last wheel event before the track settles on the nearest card. */
const WHEEL_SETTLE_MS = 140;
/** Minimum gesture travel (px) that counts as "move to the next card". */
const WHEEL_MIN_TRAVEL = 30;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Horizontal project slider: native scroll-snap track (so touch feels native) plus wheel,
 * drag, keyboard, prev/next, pill jumps and a scrubbable progress bar.
 *
 * All programmatic scrolling goes through one GSAP-driven `glide()`. While a glide or drag is
 * running the track gets `data-busy` / `data-dragging` (snap off) so scroll-snap and CSS
 * smooth-scroll never fight the animation; snap re-engages once we land on a card.
 */
export function useProjectSlider(count: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** scrollLeft an in-flight glide is heading to (so rapid input accumulates). */
  const destRef = useRef<number | null>(null);
  /** scrollLeft where the current wheel gesture started (used to settle one card in the travel direction). */
  const gestureStartRef = useRef<number | null>(null);
  /** Index requested by a pill/arrow/bar jump; wins over scroll position until the user scrolls manually. */
  const targetRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const getCards = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>("article") ?? []),
    [],
  );

  const getMax = useCallback(() => {
    const w = wrapperRef.current;
    return w ? Math.max(0, w.scrollWidth - w.clientWidth) : 0;
  }, []);

  /** Reachable scrollLeft for each card (its snap position, clamped to the scroll range). */
  const getStops = useCallback(() => {
    const max = getMax();
    return getCards().map((c) => clamp(c.offsetLeft, 0, max));
  }, [getCards, getMax]);

  /** Card whose stop is closest to x. Ties (several cards clamped at the end) resolve to the later card. */
  const nearestIndex = useCallback(
    (x: number) => {
      const stops = getStops();
      let best = 0;
      stops.forEach((s, i) => {
        if (Math.abs(s - x) <= Math.abs(stops[best] - x)) best = i;
      });
      return best;
    },
    [getStops],
  );

  const update = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const max = getMax();
    const progress = max > 0 ? wrapper.scrollLeft / max : 0;
    if (fillRef.current) {
      fillRef.current.style.width = `${Math.max(15, Math.min(100, progress * 85 + 15))}%`;
    }
    setActive(targetRef.current ?? Math.min(count - 1, nearestIndex(wrapper.scrollLeft)));
  }, [count, getMax, nearestIndex]);

  const release = () => {
    targetRef.current = null;
  };

  const finish = useCallback(() => {
    destRef.current = null;
    if (wrapperRef.current) delete wrapperRef.current.dataset.busy;
  }, []);

  /** Cancel any glide / pending settle (user took over). */
  const stop = useCallback(() => {
    if (settleRef.current) clearTimeout(settleRef.current);
    gestureStartRef.current = null;
    tweenRef.current?.kill();
    tweenRef.current = null;
    finish();
  }, [finish]);

  const glide = useCallback(
    (x: number, duration = 0.6) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const stops = getStops();
      const to = clamp(x, stops[0] ?? 0, getMax());
      destRef.current = to;
      wrapper.dataset.busy = "true";
      tweenRef.current?.kill();
      if (window.matchMedia(REDUCED_MOTION).matches) {
        wrapper.scrollLeft = to;
        tweenRef.current = null;
        finish();
        return;
      }
      tweenRef.current = gsap.to(wrapper, {
        scrollLeft: to,
        duration,
        ease: "power3.out",
        overwrite: true,
        onComplete: finish,
      });
    },
    [finish, getMax, getStops],
  );

  const goTo = useCallback(
    (index: number) => {
      const stops = getStops();
      if (stops[index] === undefined) return;
      if (settleRef.current) clearTimeout(settleRef.current);
      gestureStartRef.current = null;
      targetRef.current = index;
      setActive(index);
      glide(stops[index], 0.7);
    },
    [getStops, glide],
  );

  /** Move to the adjacent card that is actually at a different scroll position. */
  const step = useCallback(
    (dir: 1 | -1) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const stops = getStops();
      const idx = targetRef.current ?? nearestIndex(destRef.current ?? wrapper.scrollLeft);
      let j = idx + dir;
      while (j >= 0 && j < stops.length && Math.abs(stops[j] - stops[idx]) < 1) j += dir;
      if (j >= 0 && j < stops.length) goTo(j);
    },
    [getStops, goTo, nearestIndex],
  );

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const onScrub = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    goTo(nearestIndex(ratio * getMax()));
  };

  const onBarKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next();
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") prev();
    else if (e.key === "Home") goTo(0);
    else if (e.key === "End") goTo(count - 1);
    else return;
    e.preventDefault();
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    update();
    wrapper.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Wheel / trackpad over the slider scrolls it horizontally with an eased glide, then settles on
    // the nearest card. At either end the event is left alone so Lenis keeps scrolling the page;
    // otherwise it is consumed here (stopPropagation keeps Lenis from also reacting).
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? wrapper.clientWidth : 1;
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit;
      if (delta === 0) return;
      const min = getStops()[0] ?? 0;
      const max = getMax();
      const base = destRef.current ?? wrapper.scrollLeft;
      if (max <= min || (base <= min + 1 && delta < 0) || (base >= max - 1 && delta > 0)) return;

      e.preventDefault();
      e.stopPropagation();
      release();
      if (gestureStartRef.current === null) gestureStartRef.current = wrapper.scrollLeft;
      glide(base + delta * WHEEL_SPEED, 0.5);
      if (settleRef.current) clearTimeout(settleRef.current);
      settleRef.current = setTimeout(() => {
        // Land on the card nearest the destination, but a deliberate gesture always moves at least
        // one card in its direction (a single wheel notch is shorter than half a card).
        const stops = getStops();
        const from = gestureStartRef.current ?? wrapper.scrollLeft;
        const dest = destRef.current ?? wrapper.scrollLeft;
        gestureStartRef.current = null;
        let index = nearestIndex(dest);
        const startIndex = nearestIndex(from);
        const dir = dest > from ? 1 : -1;
        if (Math.abs(dest - from) > WHEEL_MIN_TRAVEL && (index - startIndex) * dir <= 0) {
          let j = startIndex + dir;
          while (j >= 0 && j < stops.length && Math.abs(stops[j] - stops[startIndex]) < 1) j += dir;
          if (j >= 0 && j < stops.length) index = j;
        }
        glide(stops[index] ?? 0, 0.45);
      }, WHEEL_SETTLE_MS);
    };
    wrapper.addEventListener("wheel", onWheel, { passive: false });

    // Click and drag (mouse only; touch uses native scrolling + snap).
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0 || (e.target as Element).closest("a, button")) return;
      stop();
      release();
      dragging = true;
      wrapper.dataset.dragging = "true";
      startX = e.pageX - wrapper.offsetLeft;
      startScroll = wrapper.scrollLeft;
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const x = startScroll - (e.pageX - wrapper.offsetLeft - startX) * DRAG_SPEED;
      wrapper.scrollLeft = clamp(x, 0, getMax());
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      glide(getStops()[nearestIndex(wrapper.scrollLeft)] ?? 0, 0.5);
      delete wrapper.dataset.dragging;
    };
    wrapper.addEventListener("mousedown", onDown);
    wrapper.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    // A finger on the track cancels any running glide so native scrolling takes over cleanly.
    const onTouch = () => {
      stop();
      release();
    };
    wrapper.addEventListener("touchstart", onTouch, { passive: true });

    // Arrow keys move the slider while it is on screen.
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      if ((e.target as Element | null)?.closest?.("input, textarea, select, [contenteditable]")) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) step(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      stop();
      wrapper.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("mousedown", onDown);
      wrapper.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      wrapper.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
    };
  }, [update, step, stop, glide, getStops, getMax, nearestIndex]);

  return { wrapperRef, trackRef, fillRef, active, goTo, prev, next, onScrub, onBarKeyDown };
}
