import { skills } from "@/data/skills";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EasterEgg } from "@/components/EasterEgg";

export function SkillsSection() {
  return (
    <section id="skills" className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl font-bold text-light-100 mb-8">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, catIndex) => (
              <div
                key={category.name}
                className="rounded-lg bg-dark-700 p-5"
              >
                <h3 className="text-lg font-semibold text-accent-400 mb-3">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-dark-800 px-3 py-1 text-sm text-light-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {catIndex === 3 && (
                    <EasterEgg id="skills-2" className="text-xs" />
                  )}
                  {catIndex === 0 && (
                    <EasterEgg id="skills-1" className="text-xs" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
