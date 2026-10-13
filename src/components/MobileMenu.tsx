"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { mobileNav, site } from "@/data/portfolio";
import { getLenis } from "@/lib/lenis";

const FOCUSABLE = "a[href], button:not([disabled])";

/** Full-screen navigation for viewports where the topbar nav pill is hidden (<=800px). */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => setMounted(true), []);

  const setMenu = useCallback((next: boolean) => {
    setOpen(next);
    document.documentElement.classList.toggle("menu-open", next);
    const lenis = getLenis();
    if (next) lenis?.stop();
    else lenis?.start();
  }, []);

  // Closed overlay is inert so it can't take focus or be read by assistive tech.
  useEffect(() => {
    const el = overlayRef.current as (HTMLDivElement & { inert: boolean }) | null;
    if (el) el.inert = !open;
  }, [open, mounted]);

  // Move focus in on open, back to the menu button on close.
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
    else if (wasOpen.current) menuBtnRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Escape closes; leaving the phone breakpoint closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    const mq = window.matchMedia("(min-width: 801px)");
    const onChange = () => mq.matches && setMenu(false);
    // Backstop for the Tab trap: if focus ever lands outside the dialog, pull it back in.
    const onFocusIn = (e: FocusEvent) => {
      const overlay = overlayRef.current;
      if (overlay && e.target instanceof Node && !overlay.contains(e.target)) closeBtnRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
      mq.removeEventListener("change", onChange);
    };
  }, [open, setMenu]);

  // Never leave the page scroll-locked if this unmounts while open.
  useEffect(() => () => document.documentElement.classList.remove("menu-open"), []);

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const items = Array.from(overlayRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenu(false);
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    history.replaceState(null, "", href);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: "auto" });
  };

  const pill =
    "rounded-[40px] bg-white px-5 py-[9px] font-disp text-[13px] font-bold text-black transition duration-200 hover:scale-105 hover:bg-accent";

  return (
    <>
      <button
        ref={menuBtnRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setMenu(true)}
        className={`${pill} min-[801px]:hidden`}
      >
        MENU
      </button>

      {mounted &&
        createPortal(
          <div
            ref={overlayRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={trapFocus}
            className={`fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-bg-dark px-5 pb-10 pt-[18px] text-text-light transition-[opacity,transform] duration-300 ease-out ${
              open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-[10px] border-[2.5px] border-white bg-black/15 px-2.5 py-1 font-disp text-[20px] font-bold tracking-[-1px]">
                {site.logo}
              </span>
              <button ref={closeBtnRef} type="button" onClick={() => setMenu(false)} className={pill}>
                CLOSE ✕
              </button>
            </div>

            <nav aria-label="Menu" className="mt-12 flex-1">
              <span className="mb-4 block font-mono text-[13px] font-bold tracking-[2px] text-accent">( MENU )</span>
              <ul>
                {mobileNav.map((item, i) => (
                  <li key={item.href} className="border-b border-line-dark">
                    <a
                      href={item.href}
                      onClick={(e) => goTo(e, item.href)}
                      className="flex items-baseline gap-4 py-5 font-disp text-[clamp(32px,10vw,52px)] font-bold uppercase leading-none transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-[13px] font-bold tracking-[1px] text-muted-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-1.5 self-start rounded-[30px] border-[1.5px] border-black bg-accent px-[22px] py-3 font-disp text-[15px] font-bold text-black shadow-[2px_2px_0_#000] transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white hover:shadow-[4px_4px_0_var(--accent)]"
            >
              GITHUB ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>,
          document.body,
        )}
    </>
  );
}
