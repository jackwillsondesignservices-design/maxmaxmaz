import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/lib/images";

type EditorialImageProps = {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Gentle vertical parallax, in percent of travel. 0 disables. */
  parallax?: number;
  zoom?: boolean;
};

/**
 * Image with a reserved box (set by the parent's sizing). While loading it shows the
 * photograph's own colour and a blurred preview, then the full image fades in sharp.
 * On first sight the frame opens out from a slight inset (cinematic reveal).
 */
export function EditorialImage({
  image,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  parallax = 0,
  zoom = false,
}: EditorialImageProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);

  // Catch images that finished loading before hydration.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  // Open the frame the first time it enters the viewport.
  useEffect(() => {
    if (inView) return;
    const wrap = wrapRef.current;
    if (!wrap || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!parallax) return;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      img.style.transform = `translate3d(0, ${(-progress * parallax).toFixed(2)}%, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [parallax]);

  const position = image.position ?? "50% 50%";

  return (
    <div
      ref={wrapRef}
      data-loaded={loaded}
      data-inview={inView}
      className={cn("ei relative overflow-hidden bg-pine", zoom && "img-zoom", className)}
      style={image.tone ? { backgroundColor: image.tone } : undefined}
    >
      {image.lqip && (
        <span
          aria-hidden="true"
          className="ei-lqip"
          style={{ backgroundImage: `url("${image.lqip}")`, backgroundPosition: position }}
        />
      )}
      <img
        ref={imgRef}
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.srcSet ? sizes : undefined}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        data-parallax={parallax ? "" : undefined}
        className={cn("img-cover ei-img", parallax ? "scale-[1.12]" : "", imgClassName)}
        style={{ objectPosition: position }}
      />
    </div>
  );
}
