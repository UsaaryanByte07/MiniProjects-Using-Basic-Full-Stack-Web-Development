import TechStackPills from "../TechStackPills";

const ProjectCard = (props) => {
  return (
    <>
      <div className="m-5 p-5 rounded-xl bg-slate-100 shadow-xl">
        <div className="m-2">
          <h1 className="text-2xl font-medium">{props.projectName}</h1>
          <p className="text-xm text-slate-600">{props.projectDescription}</p>
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
