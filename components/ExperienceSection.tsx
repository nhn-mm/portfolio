import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { experiences } from "@/data/experience";
import { EasterEgg } from "@/components/EasterEgg";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-light-100 mb-12 text-center">
            Experience
          </h2>
        </ScrollAnimationWrapper>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-dark-700" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ScrollAnimationWrapper key={experience.id}>
                <div className="relative pl-12 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full bg-accent-400 border-2 border-dark-800" />
                  {index === 1 && (
                    <div className="absolute left-1 md:left-5 top-8">
                      <EasterEgg id="experience-1" className="text-xs" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute left-1 md:left-5 top-8">
                      <EasterEgg id="experience-2" className="text-xs" />
                    </div>
                  )}

                  <div className="bg-dark-800 rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-light-100">
                        {experience.role}
                      </h3>
                      {experience.period && (
                        <span className="text-sm text-light-400 mt-1 sm:mt-0">
                          {experience.period}
                        </span>
                      )}
                    </div>

                    <p className="text-accent-400 font-medium mb-4">
                      {experience.company}
                    </p>

                    {experience.responsibilities.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {experience.responsibilities.map((responsibility, index) => (
                          <li
                            key={index}
                            className="text-light-300 text-sm flex items-start"
                          >
                            <span className="text-accent-500 mr-2 mt-1 shrink-0">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {experience.projects && experience.projects.length > 0 && (
                      <div>
                        <p className="text-sm text-light-400 font-medium mb-2">
                          Projects:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {experience.projects.map((project) => (
                            <span
                              key={project}
                              className="text-xs bg-dark-700 text-light-300 px-2 py-1 rounded"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
