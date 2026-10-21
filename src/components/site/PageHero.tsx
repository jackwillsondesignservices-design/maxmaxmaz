import type { CSSProperties, ReactNode } from "react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { riseDelay } from "@/lib/motion";

type PageHeroProps = {
  image: SiteImage;
  label: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "bottom" | "center";
  height?: "tall" | "medium";
};

/** Cinematic internal-page hero: full-bleed photograph, display headline designed into the image. */
export function PageHero({ image, label, index, title, intro, align = "bottom", height = "tall" }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate flex overflow-hidden bg-forest text-on-dark",
        height === "tall" ? "min-h-[88svh] md:min-h-[92svh]" : "min-h-[70svh] md:min-h-[78svh]",
        align === "bottom" ? "items-end" : "items-center",
      )}
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="100vw"
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="eager"
        fetchPriority="high"
        className="img-cover hero-img absolute inset-0 -z-20"
        style={{ "--pos": image.position, "--pos-m": image.mobilePosition ?? image.position } as CSSProperties}
      />
      <div className="absolute inset-0 -z-10 scrim-hero" />

      <div className="container-editorial relative pb-14 pt-36 md:pb-20">
        <div className="mb-8 flex items-center gap-4 rise-in" style={riseDelay(100)}>
          {index && <span className="numeral text-sm text-copper">{index}</span>}
          <span className="h-px w-10 bg-copper rule-draw" style={riseDelay(200)} />
          <span className="eyebrow text-on-dark-muted">{label}</span>
        </div>
        <h1 className="display-1 max-w-[14ch] rise-in" style={riseDelay(180)}>
          {title}
        </h1>
        {intro && (
          <p className="lede mt-8 max-w-xl text-on-dark-muted rise-in" style={riseDelay(380)}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
