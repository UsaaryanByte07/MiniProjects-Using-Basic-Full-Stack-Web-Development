import TechStackPills from "../TechStackPills";

const ProjectCard = (props) => {
  return (
    <>
      <div className="m-5 p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:shadow-2xl hover:border-cyan-300/40 transition-all duration-300">
        <div className="m-2">
          <h1 className="text-2xl font-bold text-white">{props.projectName}</h1>
          <p className="text-sm text-white/80 mt-1">{props.projectDescription}</p>
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
