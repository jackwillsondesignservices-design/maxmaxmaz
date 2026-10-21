import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { riseDelay } from "@/lib/motion";
import { SplitWords } from "./SplitWords";

type PageHeroProps = {
  image: SiteImage;
  label: string;
  index?: string;
  title: string;
  intro?: ReactNode;
  align?: "bottom" | "center";
  height?: "tall" | "medium";
};

/**
 * Cinematic internal-page hero: the photograph opens from its blurred preview and settles,
 * then the headline rises word by word, lit to match the image.
 */
export function PageHero({
  image,
  label,
  index,
  title,
  intro,
  align = "bottom",
  height = "tall",
}: PageHeroProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  const words = title.split(" ").length;

  return (
    <section
      className={cn(
        "relative isolate flex overflow-hidden bg-forest text-on-dark",
        height === "tall" ? "min-h-[88svh] md:min-h-[92svh]" : "min-h-[70svh] md:min-h-[78svh]",
        align === "bottom" ? "items-end" : "items-center",
      )}
    >
      <div
        className="absolute inset-0 -z-20 overflow-hidden"
        style={image.tone ? { backgroundColor: image.tone } : undefined}
      >
        {image.lqip && (
          <div
            aria-hidden="true"
            className="absolute -inset-[6%] bg-cover blur-2xl"
            style={{ backgroundImage: `url("${image.lqip}")`, backgroundPosition: image.position }}
          />
        )}
        <div className="hero-frame" data-active="true" data-loaded={loaded}>
          <img
            ref={imgRef}
            src={image.src}
            srcSet={image.srcSet}
            sizes="100vw"
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className="img-cover hero-img"
            style={
              {
                "--pos": image.position,
                "--pos-m": image.mobilePosition ?? image.position,
              } as CSSProperties
            }
          />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 scrim-hero" />
      <div className="absolute inset-0 -z-10 scrim-vignette" />

      <div className="container-editorial relative pb-14 pt-36 md:pb-20">
        <div className="mb-8 flex items-center gap-4 rise-in" style={riseDelay(100)}>
          {index && <span className="numeral text-sm text-gold">{index}</span>}
          <span
            className="h-px w-10 bg-copper shadow-[0_2px_0_var(--gold)] rule-draw"
            style={riseDelay(200)}
          />
          <span className="eyebrow text-on-dark-muted">{label}</span>
        </div>
        <h1 className="display-1 max-w-[14ch] text-luminous">
          <SplitWords text={title} delay={220} step={75} />
        </h1>
        {intro && (
          <p
            className="lede mt-8 max-w-xl text-on-dark-muted rise-in"
            style={riseDelay(420 + words * 75)}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
