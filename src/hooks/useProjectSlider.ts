"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const WHEEL_SPEED = 1.5;
const DRAG_SPEED = 1.8;

/**
 * Horizontal project slider: native scroll-snap track plus wheel, drag, keyboard,
 * prev/next, pill jumps and a scrubbable progress bar.
 */
export function useProjectSlider(count: number) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  /** Index requested by a pill/bar jump; wins over scroll position until the user scrolls manually. */
  const targetRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const behavior = useCallback((): ScrollBehavior => {
    return window.matchMedia(REDUCED_MOTION).matches ? "auto" : "smooth";
  }, []);

  const getCards = useCallback(
    () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>("article") ?? []),
    [],
  );

  /** Distance between two consecutive cards (card width + gap). */
  const getStride = useCallback(() => {
    const cards = getCards();
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : (cards[0]?.offsetWidth ?? 400);
  }, [getCards]);

  const update = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const max = wrapper.scrollWidth - wrapper.clientWidth;
    const progress = max > 0 ? wrapper.scrollLeft / max : 0;
    if (fillRef.current) {
      fillRef.current.style.width = `${Math.max(15, Math.min(100, progress * 85 + 15))}%`;
    }

    let index: number;
    if (targetRef.current !== null) index = targetRef.current;
    else if (max > 0 && wrapper.scrollLeft >= max - 2) index = count - 1;
    else index = Math.min(count - 1, Math.max(0, Math.round(wrapper.scrollLeft / getStride())));
    setActive(index);
  }, [count, getStride]);

  const release = () => {
    targetRef.current = null;
  };

  const goTo = useCallback(
    (index: number) => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      const card = getCards()[index];
      if (!wrapper || !track || !card) return;
      targetRef.current = index;
      setActive(index);
      const inset = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      wrapper.scrollTo({ left: card.offsetLeft - inset, behavior: behavior() });
    },
    [behavior, getCards],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      release();
      wrapperRef.current?.scrollBy({ left: dir * getStride(), behavior: behavior() });
    },
    [behavior, getStride],
  );

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  const onScrub = (e: ReactMouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    release();
    wrapper.scrollTo({ left: ratio * (wrapper.scrollWidth - wrapper.clientWidth), behavior: behavior() });
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

    // Wheel over the slider scrolls it horizontally. At either end the wheel is released
    // so the page can keep scrolling instead of getting stuck.
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      const max = wrapper.scrollWidth - wrapper.clientWidth;
      const atStart = wrapper.scrollLeft <= 0 && delta < 0;
      const atEnd = wrapper.scrollLeft >= max - 1 && delta > 0;
      if (max <= 0 || atStart || atEnd) return;
      e.preventDefault();
      release();
      wrapper.scrollLeft += delta * WHEEL_SPEED;
    };
    wrapper.addEventListener("wheel", onWheel, { passive: false });

    // Click and drag (mouse only; touch uses native scrolling).
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0 || (e.target as Element).closest("a, button")) return;
      dragging = true;
      release();
      wrapper.dataset.dragging = "true";
      startX = e.pageX - wrapper.offsetLeft;
      startScroll = wrapper.scrollLeft;
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      e.preventDefault();
      wrapper.scrollLeft = startScroll - (e.pageX - wrapper.offsetLeft - startX) * DRAG_SPEED;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete wrapper.dataset.dragging;
    };
    wrapper.addEventListener("mousedown", onDown);
    wrapper.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

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
      wrapper.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("mousedown", onDown);
      wrapper.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("keydown", onKey);
    };
  }, [update, step]);

  return { wrapperRef, trackRef, fillRef, active, goTo, prev, next, onScrub, onBarKeyDown };
}
