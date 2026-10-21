import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { allPages, primaryNav, site } from "@/lib/site";
import { warmPageImage } from "@/lib/images";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span aria-hidden="true" className="relative block h-5 w-5">
        <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
        <span className="absolute bottom-0 left-0 h-full w-px bg-current" />
        <span className="absolute bottom-0 left-[45%] h-[62%] w-px bg-copper" />
        <span className="absolute bottom-0 right-0 h-[35%] w-px bg-current" />
      </span>
      <span className="text-[0.78rem] font-bold tracking-[0.28em]">{site.wordmark}</span>
    </span>
  );
}

/** Primary links with one copper rule that glides to whichever link is hovered, resting on the current page. */
function PrimaryNav({ pathname }: { pathname: string }) {
  const navRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [bar, setBar] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false });
  const [animate, setAnimate] = useState(false);

  const target = hovered ?? (primaryNav.some((n) => n.to === pathname) ? pathname : null);

  const measure = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (!target) {
      setBar((b) => ({ ...b, on: false }));
      return;
    }
    const el = nav.querySelector<HTMLElement>(`[data-nav="${target}"]`);
    if (!el) return;
    setBar({ x: el.offsetLeft, w: el.offsetWidth, on: true });
  }, [target]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    // Let the first placement happen without a sweep, then animate every move after.
    const t = requestAnimationFrame(() => setAnimate(true));
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="relative hidden items-center gap-8 lg:flex xl:gap-10"
      onMouseLeave={() => setHovered(null)}
    >
      {primaryNav.map((item) => {
        const dim = target !== null && target !== item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            data-nav={item.to}
            onMouseEnter={() => {
              setHovered(item.to);
              warmPageImage(item.to);
            }}
            onFocus={() => {
              setHovered(item.to);
              warmPageImage(item.to);
            }}
            onBlur={() => setHovered(null)}
            className={cn("nav-link text-on-dark", dim ? "opacity-60" : "opacity-100")}
          >
            {item.label}
          </Link>
        );
      })}
      <span
        aria-hidden="true"
        className={cn("nav-indicator", !animate && "transition-none")}
        style={{ transform: `translateX(${bar.x}px) scaleX(${bar.w})`, opacity: bar.on ? 1 : 0 }}
      />
    </nav>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Solid after leaving the hero; tucks away while reading down, returns on any upward scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 320);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the menu and reveal the header after navigation.
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Lock background scroll, support Escape, move focus into the menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  const forceSolid = pathname === "/contact";
  const solid = (scrolled || forceSolid) && !open;
  const tucked = hidden && !open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-limestone focus:px-4 focus:py-2 focus:text-charcoal"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-on-dark [view-transition-name:site-header] transition-[background-color,box-shadow,padding,transform] duration-700 ease-[var(--ease-cinematic)]",
          solid ? "bg-forest/90 py-3 shadow-[0_1px_0_var(--rule-dark)] backdrop-blur-xl" : "bg-transparent py-5 md:py-7",
          tucked && "-translate-y-full",
        )}
      >
        <div className="container-editorial flex items-center justify-between gap-6">
          <Link
            to="/"
            className="relative z-[60] -my-2 py-2 transition-opacity duration-300 hover:opacity-80"
            aria-label={`${site.name} — home`}
            onMouseEnter={() => warmPageImage("/")}
          >
            <Wordmark />
          </Link>

          <PrimaryNav pathname={pathname} />

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              onMouseEnter={() => warmPageImage("/contact")}
              className="group relative hidden overflow-hidden border border-rule-dark px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.2em] uppercase transition-[border-color] duration-500 hover:border-copper lg:inline-block"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-copper transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:scale-y-100"
              />
              <span className="relative">Contact</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-[60] -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-cinematic)]",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-cinematic)]",
                    open ? "w-6 -translate-y-1.5 -rotate-45" : "w-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-lenis-prevent
        className={cn(
          "fixed inset-0 z-[45] flex flex-col bg-forest text-on-dark transition-[clip-path,visibility] duration-700 ease-[var(--ease-cinematic)] lg:hidden",
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]",
        )}
      >
        <div className="container-editorial flex flex-1 flex-col justify-between overflow-y-auto pb-10 pt-28">
          <nav aria-label="Mobile">
            <ul className="border-t border-rule-dark">
              {allPages.map((item, i) => (
                <li key={item.to} className="overflow-hidden border-b border-rule-dark">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    to={item.to}
                    tabIndex={open ? 0 : -1}
                    onTouchStart={() => warmPageImage(item.to)}
                    className={cn(
                      "group flex items-baseline justify-between gap-4 py-4 font-display text-[clamp(1.75rem,7vw,2.75rem)] leading-tight transition-[color,transform,opacity] duration-700 ease-[var(--ease-cinematic)] hover:text-copper data-[status=active]:text-copper",
                      open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                    )}
                    style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
                  >
                    <span>{item.longLabel}</span>
                    <span className="numeral text-sm text-on-dark-muted">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="eyebrow mt-10 text-sage">{site.editorialLine}</p>
        </div>
      </div>
    </>
  );
}
