import { Label, Reveal, SectionTitle } from "../custom";
import { ProjCard } from "./ProjCard";
import { PROJECTS } from "../../constants";

export function Projects() {
  return (
    <section
      id="projects"
      className="py-[110px] px-[5vw] max-w-[1100px] mx-auto"
    >
      <Reveal>
        <Label>Projects</Label>
        <SectionTitle>
          Built for
          <br />
          curiosity
        </SectionTitle>
      </Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
        {PROJECTS.map((project) => (
          <ProjCard key={project.num} {...project} />
        ))}
        <ProjCard
          num="05"
          title="And many more..."
          desc="Building things at work and on the side. See GitHub."
          href="https://github.com/nsharma1396?tab=repositories"
          delay={280}
        />
      </div>
    </section>
  );
}
