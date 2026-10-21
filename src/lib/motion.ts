import type { CSSProperties } from "react";

/** Inline custom property for staggered entrance animations (.rise-in / .rule-draw). */
export const riseDelay = (ms: number): CSSProperties => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;
