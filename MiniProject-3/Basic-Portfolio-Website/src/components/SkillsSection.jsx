import { ChevronsLeftRight } from "lucide-react";
import TechStackPills from "./TechStackPills";

const SkillsSection = () => {
  let skillsArray = [
    "Javascript",
    "HTML",
    "CSS",
    "Java",
    "Django",
    "Nodejs",
    "Expressjs",
    "React",
    "Tailwind CSS",
    "Bootstrap",
    "Git and Github",
    "Docker",
    "Python",
    "Ruby on Rails",
    "Spring Boot",
    "PyTorch",
    "TypeScript",
  ];
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <ChevronsLeftRight size={35} className="text-cyan-300" />
          <h1 className="text-3xl font-bold mx-2 text-white">Skills</h1>
        </div>
        <div className="flex flex-wrap gap-5 mx-6 my-3">
          {skillsArray.map((skillName) => {
            return <TechStackPills pillFor="skills" skillName={skillName} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SkillsSection;
