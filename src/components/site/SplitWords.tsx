import { Fragment } from "react";
import { riseDelay } from "@/lib/motion";

/**
 * Splits a headline into words that rise one by one from behind a mask.
 * Text stays real, selectable and readable by screen readers.
 */
export function SplitWords({
  text,
  delay = 0,
  step = 70,
}: {
  text: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word-mask">
            <span className="word-rise" style={riseDelay(delay + i * step)}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
