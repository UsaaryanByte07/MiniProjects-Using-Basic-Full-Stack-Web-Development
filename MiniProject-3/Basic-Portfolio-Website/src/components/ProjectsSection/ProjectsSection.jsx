import ProjectCard from "./ProjectCard";
import { FolderGit2 } from 'lucide-react';

const ProjectsSection = () => {
  const projectsArray = [
    {
      projectName: "Portfolio Website",
      projectDescription:
        "Developed a fully-functional e-commerce platform with user authentication, product management, and payment integration.",
      techStackArray: [
        "React",
        "Tailwind",
        "Lucide-React",
        "Javascript",
        "HTML",
        "CSS",
      ],
    },
    {
      projectName: "Portfolio Website",
      projectDescription:
        "Developed a fully-functional e-commerce platform with user authentication, product management, and payment integration.",
      techStackArray: [
        "React",
        "Tailwind",
        "Lucide-React",
        "Javascript",
        "HTML",
        "CSS",
      ],
    },
  ];
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <FolderGit2 size={35}/>
          <h1 className="text-3xl font-bold mx-2">Projects</h1>
        </div>
        <div className="mt-5">
          {projectsArray.map((project) => {
            return (
              <ProjectCard
                projectName={project.projectName}
                projectDescription={project.projectDescription}
                techStackArray={project.techStackArray}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectsSection;
