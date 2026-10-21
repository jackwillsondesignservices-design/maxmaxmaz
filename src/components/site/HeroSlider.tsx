import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { heroFrames } from "@/lib/images";
import { cn } from "@/lib/utils";

const SLIDE_MS = 2000;

function preload(src: string, srcSet?: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    if (srcSet) {
      img.sizes = "100vw";
      img.srcset = srcSet;
    }
    img.src = src;
    const done = () => {
      if (typeof img.decode === "function") {
        img.decode().then(resolve, resolve);
      } else {
        resolve();
      }
    };
    if (img.complete) return done();
    img.onload = done;
    img.onerror = () => resolve();
  });
}

/**
 * Automatic architectural hero slider — no visible controls.
 * Six frames, 2s each, ~750ms crossfade with a subtle settle-in scale.
 * The first frame opens from its own blurred preview; the schedule starts once it is sharp.
 * Each next frame is fully decoded before it is shown, so nothing ever flashes in half-loaded.
 */
export function HeroSlider({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [ready, setReady] = useState<Set<number>>(() => new Set([0]));
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [cycle, setCycle] = useState(0);
  const readyRef = useRef(ready);
  const activeRef = useRef(0);
  const firstImgRef = useRef<HTMLImageElement | null>(null);
  readyRef.current = ready;

  // The first image may finish before hydration.
  useEffect(() => {
    const img = firstImgRef.current;
    if (img?.complete && img.naturalWidth > 0) setFirstLoaded(true);
  }, []);

  const prepare = useCallback((index: number) => {
    if (readyRef.current.has(index)) return Promise.resolve();
    const f = heroFrames[index];
    if (!f) return Promise.resolve();
    return preload(f.src, f.srcSet).then(() => {
      setReady((prev) => {
        if (prev.has(index)) return prev;
        const next = new Set(prev);
        next.add(index);
        readyRef.current = next;
        return next;
      });
    });
  }, []);

  useEffect(() => {
    if (!firstLoaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    // Warm the second frame once the first paint has settled.
    const warm = window.setTimeout(() => void prepare(1), 150);

    const tick = () => {
      if (cancelled) return;
      // Pause slide work while the tab is hidden.
      if (!document.hidden) {
        const current = activeRef.current;
        const next = (current + 1) % heroFrames.length;
        if (readyRef.current.has(next)) {
          activeRef.current = next;
          setLeaving(current);
          setActive(next);
          setCycle((c) => c + 1);
          void prepare((next + 1) % heroFrames.length);
        } else {
          // Hold the current frame rather than flash a blank one.
          void prepare(next);
        }
      }
      timer = setTimeout(tick, SLIDE_MS);
    };

    timer = setTimeout(tick, SLIDE_MS);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.clearTimeout(warm);
    };
  }, [prepare, firstLoaded]);

  // Drop the outgoing layer once the crossfade has completed.
  useEffect(() => {
    if (leaving === null) return;
    const t = setTimeout(() => setLeaving(null), 900);
    return () => clearTimeout(t);
  }, [leaving, cycle]);

  const first = heroFrames[0];

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-forest", className)}>
      {/* Blurred preview of the first frame — visible instantly, before any photograph downloads */}
      {first?.lqip && (
        <div
          aria-hidden="true"
          className="absolute -inset-[6%] bg-cover blur-2xl"
          style={{ backgroundImage: `url("${first.lqip}")`, backgroundPosition: first.position }}
        />
      )}
      {heroFrames.map((frame, i) => {
        if (!ready.has(i)) return null;
        const isActive = i === active;
        return (
          <div
            key={frame.src}
            className="hero-frame"
            data-active={isActive}
            data-leaving={i === leaving && !isActive}
            data-loaded={i === 0 ? firstLoaded : true}
            aria-hidden={!isActive}
          >
            <img
              ref={i === 0 ? firstImgRef : undefined}
              src={frame.src}
              srcSet={frame.srcSet}
              sizes="100vw"
              alt={isActive ? frame.alt : ""}
              width={frame.width}
              height={frame.height}
              loading="eager"
              fetchPriority={i === 0 ? "high" : "low"}
              decoding={i === 0 ? "sync" : "async"}
              onLoad={i === 0 ? () => setFirstLoaded(true) : undefined}
              onError={i === 0 ? () => setFirstLoaded(true) : undefined}
              className="img-cover hero-img"
              style={{ "--pos": frame.position, "--pos-m": frame.mobilePosition } as CSSProperties}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 z-[3] scrim-hero" />
      <div className="absolute inset-0 z-[3] scrim-vignette" />
      <div className="absolute bottom-0 left-0 right-0 z-[4] h-px bg-rule-dark" aria-hidden="true">
        {firstLoaded && <div key={cycle} className="hero-progress h-px bg-copper" />}
      </div>
    </div>
  );
}
