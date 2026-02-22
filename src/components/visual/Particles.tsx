import { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import type { Particle } from "../../types";

function hexToRgb(hex: string): string {
  const numericValue = parseInt(hex.replace("#", ""), 16);
  return `${(numericValue >> 16) & 255},${(numericValue >> 8) & 255},${numericValue & 255}`;
}

export function Particles() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentColorRef = useRef(theme.acc);

  useEffect(() => {
    accentColorRef.current = theme.acc;
  }, [theme.acc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mousePosition = { x: -999, y: -999 };

    const init = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      particles = Array.from(
        { length: 65 },
        (): Particle => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.3 + 0.4,
          ph: Math.random() * Math.PI * 2,
        }),
      );
    };
    init();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", (event: MouseEvent) => {
      mousePosition.x = event.clientX;
      mousePosition.y = event.clientY;
    });

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const timeSeconds = Date.now() * 0.001;
      const rgbString = hexToRgb(accentColorRef.current ?? "#ff5c3a");

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        const deltaX = mousePosition.x - particle.x;
        const deltaY = mousePosition.y - particle.y;
        const distanceToMouse = Math.hypot(deltaX, deltaY);
        if (distanceToMouse < 120) {
          particle.vx += deltaX * 0.00012;
          particle.vy += deltaY * 0.00012;
        }
        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgbString},${0.1 + Math.sin(timeSeconds + particle.ph) * 0.06})`;
        context.fill();
      });

      for (
        let particleIndex = 0;
        particleIndex < particles.length;
        particleIndex++
      ) {
        for (
          let otherIndex = particleIndex + 1;
          otherIndex < particles.length;
          otherIndex++
        ) {
          const other = particles[otherIndex];
          const current = particles[particleIndex];
          const distance = Math.hypot(other.x - current.x, other.y - current.y);
          if (distance < 100) {
            context.beginPath();
            context.moveTo(current.x, current.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(${rgbString},${(1 - distance / 100) * 0.15})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
