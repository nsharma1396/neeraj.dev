import { useRef, useEffect, useState } from "react";

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = (canvas.width = 300);
    const height = (canvas.height = 300);

    const imageData = context.createImageData(width, height);
    for (
      let pixelIndex = 0;
      pixelIndex < imageData.data.length;
      pixelIndex += 4
    ) {
      const grayValue = Math.random() * 255;
      imageData.data[pixelIndex] =
        imageData.data[pixelIndex + 1] =
        imageData.data[pixelIndex + 2] =
          grayValue;
      imageData.data[pixelIndex + 3] = 8;
    }
    context.putImageData(imageData, 0, 0);
    setDataUrl(canvas.toDataURL());
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-repeat"
      style={{
        backgroundImage: dataUrl ? `url(${dataUrl})` : undefined,
      }}
    >
      <canvas ref={canvasRef} className="hidden" width={300} height={300} />
    </div>
  );
}
