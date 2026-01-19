const TechStackPills = (props) => {
  if (props.pillFor == "project") {
    return (
      <div className="text-xs font-semibold min-w-10 text-center h-fit p-1.5 px-3 bg-cyan-400/20 backdrop-blur-sm rounded-md text-cyan-100 border border-cyan-300/30 hover:bg-cyan-400/30 hover:border-cyan-300/50 transition-all duration-200">
        {props.techName}
      </div>
    );
  }
  if(props.pillFor == "skills"){
    return (
      <div className="text-[13px] font-bold min-w-10 text-center h-fit py-1.5 px-3 bg-purple-400/20 backdrop-blur-sm rounded-full text-purple-100 border border-purple-300/30 hover:bg-purple-400/30 hover:border-purple-300/50 hover:scale-105 transition-all duration-200">
        {props.skillName}
      </div>
    )
  }
};

export default TechStackPills;
