import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import Lenis from "lenis";

/**
 * Weighted, inertial scrolling for mouse and trackpad (touch stays native).
 * Pauses during navigation so the router's scroll restoration lands exactly.
 * Disabled entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
      anchors: { offset: -40 },
      autoRaf: true,
    });

    const offBefore = router.subscribe("onBeforeNavigate", () => lenis.stop());
    const offResolved = router.subscribe("onResolved", () => {
      requestAnimationFrame(() => {
        lenis.start();
        lenis.resize();
      });
    });

    return () => {
      offBefore();
      offResolved();
      lenis.destroy();
    };
  }, [router]);

  return null;
}
