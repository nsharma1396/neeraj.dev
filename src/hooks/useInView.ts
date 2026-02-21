import { useState, useEffect, type RefObject } from "react";

export function useInView(
  ref: RefObject<Element | null>,
  threshold: number = 0.12
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}
