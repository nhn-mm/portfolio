"use client";

import { useState } from "react";
import { Project } from "@/types";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { EasterEgg } from "@/components/EasterEgg";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-light-100 mb-8">
            Projects <EasterEgg id="projects" className="text-xs" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={handleCardClick} />
            ))}
          </div>
        </ScrollAnimationWrapper>
      </div>
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
