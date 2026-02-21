import { useTheme } from "../../context/ThemeContext";
import { PALETTES } from "../../constants";

export function PalettePicker() {
  const { paletteIndex, setPaletteIndex } = useTheme();

  return (
    <div className="flex items-center gap-[7px]">
      {PALETTES.map((palette, index) => (
        <button
          key={palette.name}
          type="button"
          data-h
          title={palette.name}
          onClick={() => setPaletteIndex(index)}
          className="rounded-full p-0 shrink-0 cursor-none transition-all duration-300 ease-out border-2"
          style={{
            width: paletteIndex === index ? 22 : 14,
            height: paletteIndex === index ? 22 : 14,
            background: palette.acc,
            borderColor:
              paletteIndex === index
                ? "rgba(255,255,255,0.7)"
                : "transparent",
            boxShadow:
              paletteIndex === index ? `0 0 10px ${palette.acc}88` : "none",
          }}
        />
      ))}
    </div>
  );
}
