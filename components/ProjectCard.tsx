import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(project);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(project)}
      onKeyDown={handleKeyDown}
      className="bg-dark-800 rounded-lg overflow-hidden cursor-pointer hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400"
    >
      <div className="relative w-full h-48 flex items-center justify-center bg-black">
        <img
          src={project.image}
          alt={`Screenshot of ${project.title} project`}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-light-100 mb-2">{project.title}</h3>
        <p className="text-sm text-light-400 mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs bg-dark-700 text-accent-400 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
