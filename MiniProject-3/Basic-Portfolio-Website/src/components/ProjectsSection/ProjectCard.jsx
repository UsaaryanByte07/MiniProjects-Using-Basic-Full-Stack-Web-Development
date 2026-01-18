import TechStackPills from "../TechStackPills";

const ProjectCard = (props) => {
  return (
    <>
      <div className="m-5 p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="m-2">
          <h1 className="text-2xl font-medium text-white">{props.projectName}</h1>
          <p className="text-xm text-white/70">{props.projectDescription}</p>
        </div>
        <div className="flex flex-wrap gap-5 m-2">
          {props.techStackArray.map((techName) => {
            return <TechStackPills pillFor="project" techName={techName} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
