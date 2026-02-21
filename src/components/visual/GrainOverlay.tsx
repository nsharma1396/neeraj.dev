import { useRef, useEffect } from "react";

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width: number;
    let height: number;
    let animationFrameId: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const imageData = context.createImageData(width, height);
      const data = imageData.data;
      for (let pixelIndex = 0; pixelIndex < data.length; pixelIndex += 4) {
        const grayValue = Math.random() * 25;
        // console.log(pixelIndex, grayValue);
        data[pixelIndex] =
          data[pixelIndex + 1] =
          data[pixelIndex + 2] =
            grayValue;
        data[pixelIndex + 3] = 1;
      }
      context.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none w-full h-full opacity-[0.05] mix-blend-overlay"
    />
  );
}
