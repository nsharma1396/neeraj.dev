import { Label, Reveal, SectionTitle } from "../custom";
import { RoleRow } from "./RoleRow";
import { ROLES } from "../../constants";

export function Work() {
  return (
    <section id="work" className="py-[110px] px-[5vw] max-w-[1100px] mx-auto">
      <Reveal>
        <Label>Experience</Label>
        <SectionTitle>
          Where I&apos;ve
          <br />
          built things
        </SectionTitle>
      </Reveal>
      <div className="border-t border-[var(--theme-br)]">
        {ROLES.map((role, index) => (
          <RoleRow key={index} {...role} />
        ))}
      </div>
    </section>
  );
}
