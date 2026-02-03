const Key = (props) => {
  {
    const isDelete = props.keyText?.type?.name === "Delete";

    if (props.keyText == "+") {
      return (
        <div
          className="bg-[var(--bg-panel)] border border-[var(--neon-pink)] text-[var(--neon-pink)] hover:bg-[var(--neon-pink)] hover:text-black hover:shadow-[0_0_15px_var(--neon-pink)] transition-all duration-200 cursor-pointer m-1.5 row-span-2 rounded-xl flex justify-center items-center text-2xl shadow-[0_0_5px_rgba(0,0,0,0.5)]"
          onKeyDown={props.clickHandler}
          onClick={props.clickHandler}
        >
          {props.keyText}
        </div>
      );
    } else if (props.keyText == "=") {
      return (
        <div
          className="bg-[var(--bg-panel)] border border-[var(--neon-yellow)] text-[var(--neon-yellow)] hover:bg-[var(--neon-yellow)] hover:text-black hover:shadow-[0_0_15px_var(--neon-yellow)] transition-all duration-200 cursor-pointer m-1.5 col-span-2 rounded-xl flex justify-center items-center text-2xl shadow-[0_0_5px_rgba(0,0,0,0.5)]"
          onClick={props.clickHandler}
        >
          {props.keyText}
        </div>
      );
    } else if (props.isDelete) {
      return (
        <div
          className="bg-[var(--bg-panel)] border border-[var(--neon-red)] text-[var(--neon-red)] hover:bg-[var(--neon-red)] hover:text-black hover:shadow-[0_0_15px_var(--neon-red)] transition-all duration-200 cursor-pointer m-1.5 rounded-xl flex justify-center items-center text-2xl is-delete-btn shadow-[0_0_5px_rgba(0,0,0,0.5)]"
          onClick={props.clickHandler}
        >
          {props.keyText}
        </div>
      );
    } else {
      // Check if it's 'C' to give it the red theme too, otherwise default cyan
      const isClear = props.keyText === "C";
      const baseColorClass = isClear 
        ? "border-[var(--neon-red)] text-[var(--neon-red)] hover:bg-[var(--neon-red)] hover:shadow-[0_0_15px_var(--neon-red)]"
        : "border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)] hover:shadow-[0_0_15px_var(--neon-cyan)]";
      
      return (
        <div
          className={`bg-[var(--bg-panel)] border ${baseColorClass} hover:text-black transition-all duration-200 cursor-pointer m-1.5 rounded-xl flex justify-center items-center text-2xl shadow-[0_0_5px_rgba(0,0,0,0.5)]`}
          onClick={props.clickHandler}
        >
          {props.keyText}
        </div>
      );
    }
  }
};

export default Key;
