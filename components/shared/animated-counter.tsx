"use client";

import CountUp from "react-countup";
import { useInView } from "@/hooks/use-in-view";

type AnimatedCounterProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
};

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2.5,
  decimals = 0,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref}>
      {prefix}
      {inView ? (
        <CountUp end={end} duration={duration} decimals={decimals} separator="," />
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
}
