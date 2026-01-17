const TechStackPills = (props) => {
  if (props.pillFor == "project") {
    return (
      <div className="text-xs min-w-10 text-center h-fit p-1 px-2.5 bg-blue-100 rounded-md text-blue-950">
        {props.techName}
      </div>
    );
  }
};

export default TechStackPills;
