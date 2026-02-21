import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useTheme } from "../../context/ThemeContext";
import { SKILLS, SKILL_CATEGORIES } from "../../constants";
import type { Skill } from "../../types";

export function RadarChart() {
  const { theme } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

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
    if (!isInView || !svgRef.current) return;

    const svgElement = svgRef.current;
    const size = Math.min(svgElement.parentElement!.clientWidth, 480);
    const centerX = size / 2;
    const centerY = size / 2;
    const innerRadius = size * 0.17;
    const outerRadius = size * 0.41;
    const skillCount = SKILLS.length;
    const sliceAngle = (Math.PI * 2) / skillCount;

    d3.select(svgElement).selectAll("*").remove();
    const svg = d3
      .select(svgElement)
      .attr("width", size)
      .attr("height", size)
      .attr("viewBox", `0 0 ${size} ${size}`);

    [0.25, 0.5, 0.75, 1].forEach((radiusFactor) =>
      svg
        .append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", innerRadius + (outerRadius - innerRadius) * radiusFactor)
        .attr("fill", "none")
        .attr("stroke", "rgba(240,238,232,0.06)")
        .attr("stroke-width", 1),
    );

    SKILLS.forEach((_, skillIndex) => {
      const angle = sliceAngle * skillIndex - Math.PI / 2;
      svg
        .append("line")
        .attr("x1", centerX + Math.cos(angle) * innerRadius)
        .attr("y1", centerY + Math.sin(angle) * innerRadius)
        .attr("x2", centerX + Math.cos(angle) * outerRadius)
        .attr("y2", centerY + Math.sin(angle) * outerRadius)
        .attr("stroke", "rgba(240,238,232,0.05)")
        .attr("stroke-width", 1);
    });

    const path = svg
      .append("path")
      .datum(SKILLS)
      .attr(
        "d",
        d3
          .lineRadial<Skill>()
          .angle((_, index) => sliceAngle * index)
          .radius(
            (skill) =>
              innerRadius + (outerRadius - innerRadius) * (skill.value / 100),
          )
          .curve(d3.curveLinearClosed),
      )
      .attr("transform", `translate(${centerX},${centerY}) rotate(-90)`)
      .attr("fill", `${theme.acc}18`)
      .attr("stroke", theme.acc)
      .attr("stroke-width", 1.8)
      .attr("stroke-linejoin", "round");

    const pathLength = path.node()!.getTotalLength();
    path
      .attr("stroke-dasharray", pathLength)
      .attr("stroke-dashoffset", pathLength)
      .transition()
      .duration(1800)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0);

    SKILLS.forEach((skill, skillIndex) => {
      const angle = sliceAngle * skillIndex - Math.PI / 2;
      const radius =
        innerRadius + (outerRadius - innerRadius) * (skill.value / 100);
      const pointX = centerX + Math.cos(angle) * radius;
      const pointY = centerY + Math.sin(angle) * radius;
      const labelX = centerX + Math.cos(angle) * (outerRadius + 20);
      const labelY = centerY + Math.sin(angle) * (outerRadius + 20);
      const categoryColor = SKILL_CATEGORIES[skill.cat];

      svg
        .append("circle")
        .attr("cx", pointX)
        .attr("cy", pointY)
        .attr("r", 0)
        .attr("fill", categoryColor)
        .attr("stroke", theme.bg)
        .attr("stroke-width", 2)
        .style("cursor", "pointer")
        .transition()
        .delay(900 + skillIndex * 65)
        .duration(350)
        .ease(d3.easeBackOut)
        .attr("r", 5);

      svg
        .append("circle")
        .attr("cx", pointX)
        .attr("cy", pointY)
        .attr("r", 14)
        .attr("fill", "transparent")
        .style("cursor", "pointer")
        .on("mouseenter", () => setHoveredSkill(skill))
        .on("mouseleave", () => setHoveredSkill(null));

      const textAnchor =
        Math.cos(angle) > 0.1
          ? "start"
          : Math.cos(angle) < -0.1
            ? "end"
            : "middle";
      svg
        .append("text")
        .attr("x", labelX)
        .attr("y", labelY + 4)
        .attr("text-anchor", textAnchor)
        .attr("font-family", "'Fira Code',monospace")
        .attr("font-size", 9.5)
        .attr("fill", "rgba(240,238,232,0.5)")
        .attr("opacity", 0)
        .text(skill.label)
        .transition()
        .delay(1000 + skillIndex * 65)
        .duration(350)
        .attr("opacity", 1);
    });

    const legendGroup = svg.append("g").attr("transform", "translate(10,10)");
    Object.entries(SKILL_CATEGORIES).forEach(
      ([categoryName, categoryColor], legendIndex) => {
        legendGroup
          .append("circle")
          .attr("cx", 5)
          .attr("cy", legendIndex * 17 + 5)
          .attr("r", 4)
          .attr("fill", categoryColor);
        legendGroup
          .append("text")
          .attr("x", 14)
          .attr("y", legendIndex * 17 + 9)
          .attr("font-family", "'Fira Code',monospace")
          .attr("font-size", 9)
          .attr("fill", "rgba(240,238,232,0.4)")
          .text(categoryName);
      },
    );
  }, [isInView, theme.acc, theme.bg]);

  return (
    <div ref={wrapperRef} className="relative flex justify-center">
      <svg ref={svgRef} className="w-full max-w-[480px] overflow-visible" />
      {hoveredSkill && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="font-mono text-[10px] text-[var(--theme-mu)] tracking-[0.1em] mt-0.5">
            {hoveredSkill.label}
          </div>
        </div>
      )}
    </div>
  );
}
