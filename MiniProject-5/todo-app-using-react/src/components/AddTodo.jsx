import { useContext, useRef, useState } from "react";
import { handleAddClick } from "../utils/Handlers";
import Alert from "./Alert";
import { TodoContext } from "../store/TodoContextProvider";

export const AddTodo = () => {
  const todoText = useRef();
  const todoDate = useRef();
  const [alertMessage, setAlertMessage] = useState("");
  const {addTodo} = useContext(TodoContext);

  return (
    <>
    {alertMessage && <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50"><Alert warningText={alertMessage} deleteAlert={() => setAlertMessage("")} /></div>}
    <form className="w-full flex items-center justify-between gap-4 p-4 rounded-3xl neu-flat bg-[var(--bg-color)] mb-6 transition-all hover:shadow-lg">
      <input
        type="date"
        className="w-1/4 h-12 px-4 rounded-xl neu-pressed bg-transparent border-none outline-none text-[var(--text-secondary)] focus:text-[var(--accent-blue)] transition-colors"
        ref={todoDate}
      />
      <input
        type="text"
        placeholder="Enter the Todo"
        className="flex-1 h-12 px-6 rounded-xl neu-pressed bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:text-[var(--accent-blue)] transition-colors"
        ref={todoText}
      />
      <button
        type="submit"
        className="h-12 px-6 rounded-xl neu-button text-[var(--accent-blue)] font-bold flex items-center justify-center gap-2 hover:text-blue-600 active:scale-[0.98] transition-all"
        onClick={(e) => handleAddClick(e,{todoText,todoDate},addTodo,setAlertMessage)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 14 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.75 1.5V4.75H11V6.25H7.75V9.5H6.25V6.25H3V4.75H6.25V1.5H7.75Z"
            fill="currentColor"
          />
        </svg>
        <span className="hidden md:inline">ADD</span>
      </button>
    </form>
    </>
  );
};
