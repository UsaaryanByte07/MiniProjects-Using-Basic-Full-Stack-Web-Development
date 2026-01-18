const TechStackPills = (props) => {
  if (props.pillFor == "project") {
    return (
      <div className="text-xs min-w-10 text-center h-fit p-1 px-2.5 bg-cyan-400/20 backdrop-blur-sm rounded-md text-cyan-100 border border-cyan-300/30">
        {props.techName}
      </div>
    );
  }
  if(props.pillFor == "skills"){
    return (
      <div className="text-[13px] font-bold min-w-10 text-center h-fit py-1.5 px-3 bg-purple-400/20 backdrop-blur-sm rounded-full text-purple-100 border border-purple-300/30">
        {props.skillName}
      </div>
    )
  }
};

export default TechStackPills;
