"use client";

import { useState, useEffect } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
}

export function CountUp({ value, duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    let totalMiliseconds = duration * 1000;
    let incrementTime = totalMiliseconds / end;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}
