import { Label, Reveal, SectionTitle } from "../custom";
import { RadarChart } from "../visual";
import { SKILL_CATEGORIES } from "../../constants";

export function Skills() {
  return (
    <section id="skills" className="py-[110px] px-[5vw]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0 gap-x-14 items-center">
        <div>
          <Reveal>
            <Label>Stack</Label>
            <SectionTitle>
              Tools of
              <br />
              the trade
            </SectionTitle>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-2"></div>
          </Reveal>
        </div>
        <RadarChart />
      </div>
    </section>
  );
}
