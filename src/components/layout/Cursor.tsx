import { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const cursorBaseStyles: React.CSSProperties = {
  position: "fixed",
  zIndex: 9999,
  pointerEvents: "none",
  borderRadius: "50%",
  transform: "translate(-50%,-50%)",
};

export function Cursor() {
  const { theme } = useTheme();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -300, y: -300 });

  useEffect(() => {
    const accentColor = theme.acc;

    const handleMouseMove = (event: MouseEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${positionRef.current.x}px`;
        dotRef.current.style.top = `${positionRef.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${positionRef.current.x}px`;
        ringRef.current.style.top = `${positionRef.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    const expandRing = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = accentColor;
        ringRef.current.style.background = `${accentColor}10`;
      }
    };

    const shrinkRing = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "28px";
        ringRef.current.style.height = "28px";
        ringRef.current.style.borderColor = "rgba(240,238,232,0.35)";
        ringRef.current.style.background = "transparent";
      }
    };

    const attachHoverListeners = () => {
      document
        .querySelectorAll<HTMLElement>("a,button,[data-h]")
        .forEach((element) => {
          element.addEventListener("mouseenter", expandRing);
          element.addEventListener("mouseleave", shrinkRing);
        });
    };
    attachHoverListeners();

    const mutationObserver = new MutationObserver(attachHoverListeners);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      mutationObserver.disconnect();
    };
  }, [theme.acc]);

  return (
    // display none for mobile and block for desktop
    <div className="hidden md:block">
      <div
        ref={dotRef}
        style={{
          ...cursorBaseStyles,
          width: 7,
          height: 7,
          background: theme.acc,
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...cursorBaseStyles,
          width: 28,
          height: 28,
          border: "1px solid rgba(240,238,232,0.35)",
          transition:
            "width .25s, height .25s, border-color .25s, background .25s",
        }}
      />
    </div>
  );
}
