import { useEffect, useRef } from "react";
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
 * Image with a reserved aspect box (set by the parent's sizing), lazy loading,
 * per-image focal position and optional gentle parallax.
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

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden bg-mineral", zoom && "img-zoom", className)}>
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
        className={cn("img-cover", parallax ? "scale-[1.12]" : "", imgClassName)}
        style={{ objectPosition: image.position ?? "50% 50%" }}
      />
    </div>
  );
}
