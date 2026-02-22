import { useRef, useEffect, useState, useMemo } from "react";
import { lineRadial, curveLinearClosed } from "d3-shape";
import { useTheme } from "../../context/ThemeContext";
import { SKILLS, SKILL_CATEGORIES } from "../../constants";
import type { Skill } from "../../types";

const MAX_CHART_SIZE = 480;

interface SkillPoint {
  skill: Skill;
  pointX: number;
  pointY: number;
  labelX: number;
  labelY: number;
  textAnchor: "start" | "middle" | "end";
  categoryColor: string;
  index: number;
}

interface RadarGeometry {
  size: number;
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  gridRadii: number[];
  spokes: { x1: number; y1: number; x2: number; y2: number }[];
  pathD: string;
  skillPoints: SkillPoint[];
}

function useContainerWidth(
  ref: React.RefObject<HTMLDivElement | null>,
): number {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

function computeRadarGeometry(
  containerWidth: number,
  skills: Skill[],
): RadarGeometry | null {
  if (containerWidth <= 0 || skills.length === 0) return null;

  const size = Math.min(containerWidth, MAX_CHART_SIZE);
  const centerX = size / 2;
  const centerY = size / 2;
  const innerRadius = size * 0.17;
  const outerRadius = size * 0.41;
  const skillCount = skills.length;
  const sliceAngle = (Math.PI * 2) / skillCount;

  const gridRadii = [0.25, 0.5, 0.75, 1].map(
    (factor) => innerRadius + (outerRadius - innerRadius) * factor,
  );

  const spokes = skills.map((_, index) => {
    const angle = sliceAngle * index - Math.PI / 2;
    return {
      x1: centerX + Math.cos(angle) * innerRadius,
      y1: centerY + Math.sin(angle) * innerRadius,
      x2: centerX + Math.cos(angle) * outerRadius,
      y2: centerY + Math.sin(angle) * outerRadius,
    };
  });

  const lineRadialFn = lineRadial<Skill>()
    .angle((_, index) => sliceAngle * index)
    .radius(
      (skill) =>
        innerRadius + (outerRadius - innerRadius) * (skill.value / 100),
    )
    .curve(curveLinearClosed);

  const pathD = lineRadialFn(skills) ?? "";

  const skillPoints: SkillPoint[] = skills.map((skill, index) => {
    const angle = sliceAngle * index - Math.PI / 2;
    const radius =
      innerRadius + (outerRadius - innerRadius) * (skill.value / 100);
    const pointX = centerX + Math.cos(angle) * radius;
    const pointY = centerY + Math.sin(angle) * radius;
    const labelX = centerX + Math.cos(angle) * (outerRadius + 20);
    const labelY = centerY + Math.sin(angle) * (outerRadius + 20);
    const textAnchor: "start" | "middle" | "end" =
      Math.cos(angle) > 0.1
        ? "start"
        : Math.cos(angle) < -0.1
          ? "end"
          : "middle";
    return {
      skill,
      pointX,
      pointY,
      labelX,
      labelY,
      textAnchor,
      categoryColor: SKILL_CATEGORIES[skill.category],
      index,
    };
  });

  return {
    size,
    centerX,
    centerY,
    innerRadius,
    outerRadius,
    gridRadii,
    spokes,
    pathD,
    skillPoints,
  };
}

export function RadarChart() {
  const { theme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const containerWidth = useContainerWidth(wrapperRef);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [pathLength, setPathLength] = useState<number | null>(null);
  const [pathRevealed, setPathRevealed] = useState(false);

  const geometry = useMemo(
    () => computeRadarGeometry(containerWidth, SKILLS),
    [containerWidth],
  );

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.12 },
    );
    observer.observe(wrapperElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !geometry || !pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = length.toString();
    pathRef.current.style.strokeDashoffset = length.toString();
    setTimeout(() => {
      if (!pathRef.current) return;
      pathRef.current.style.strokeDashoffset = "0";
    }, 1000);
  }, [isInView, geometry]);

  if (!geometry) {
    return (
      <div
        ref={wrapperRef}
        className="relative flex justify-center w-full max-w-[480px] min-h-[280px]"
      />
    );
  }

  const { size, centerX, centerY, gridRadii, spokes, pathD, skillPoints } =
    geometry;

  return (
    <div ref={wrapperRef} className="relative flex justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[480px] overflow-visible"
      >
        {/* Grid circles */}
        {gridRadii.map((radius) => (
          <circle
            key={radius}
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(240,238,232,0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Spokes */}
        {spokes.map((spoke, index) => (
          <line
            key={index}
            x1={spoke.x1}
            y1={spoke.y1}
            x2={spoke.x2}
            y2={spoke.y2}
            stroke="rgba(240,238,232,0.05)"
            strokeWidth={1}
          />
        ))}

        {/* Skill polygon */}
        {
          <path
            ref={pathRef}
            d={pathD}
            transform={`translate(${centerX},${centerY})`}
            fill={`${theme.acc}18`}
            stroke={theme.acc}
            strokeWidth={1.8}
            strokeLinejoin="round"
            strokeDasharray={1111}
            strokeDashoffset={1111}
            style={{
              transition:
                "stroke-dashoffset 1.8s cubic-bezier(0.33, 0, 0.2, 1)",
            }}
          />
        }

        {/* Skill dots */}
        {skillPoints.map(({ skill, pointX, pointY, categoryColor, index }) => (
          <g key={skill.label}>
            {/* <g
              transform={`translate(${pointX},${pointY})`}
              style={{
                animation: isInView
                  ? "radar-dot-reveal 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                  : "none",
                animationDelay: `${900 + index * 65}ms`,
                opacity: isInView ? 1 : 0,
              }}
            >
              <circle
                cx={0}
                cy={0}
                r={5}
                fill={categoryColor}
                stroke={theme.bg}
                strokeWidth={2}
              />
            </g> */}
            <circle
              cx={pointX}
              cy={pointY}
              r={4}
              // fill="transparent"
              fill={categoryColor}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          </g>
        ))}

        {/* Skill labels */}
        {skillPoints.map(({ skill, labelX, labelY, textAnchor, index }) => (
          <text
            key={skill.label}
            x={labelX}
            y={labelY + 4}
            textAnchor={textAnchor}
            fontFamily="'Fira Code', monospace"
            fontSize={9.5}
            fill="rgba(240,238,232,0.5)"
            style={{
              animation: isInView
                ? "radar-label-reveal 0.35s ease-out forwards"
                : "none",
              // animationDelay: `${1000 + index * 65}ms`,
              opacity: isInView ? 1 : 0,
            }}
          >
            {skill.label}
          </text>
        ))}
      </svg>

      {hoveredSkill && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center md:pointer-events-none">
          <div className="font-mono text-[10px] text-[var(--theme-mu)] tracking-[0.1em] mt-0.5">
            {hoveredSkill.label}
          </div>
        </div>
      )}
    </div>
  );
}
