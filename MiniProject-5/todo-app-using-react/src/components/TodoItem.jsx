import { useContext } from "react"
import { TodoContext } from "../store/TodoContextProvider"
import { deleteHandler } from "../utils/Handlers";
import { Trash2 } from 'lucide-react';

export const TodoItem = ({id , todoText, todoDate}) => {
    const {deleteTodo} = useContext(TodoContext);

    return (
        <div className="w-full flex items-center justify-between gap-4 p-4 my-4 rounded-2xl neu-flat bg-[var(--bg-color)] hover:translate-y-[-2px] transition-transform duration-300">
            <div className="w-24 h-12 flex items-center justify-center text-sm font-semibold text-[var(--text-secondary)] bg-transparent rounded-xl neu-pressed">
                {todoDate}
            </div>
            <div className="flex-1 px-4 py-2 text-lg text-[var(--text-primary)] font-medium tracking-wide rounded-xl overflow-y-auto scrollbar-hide max-h-24">
                {todoText}
            </div>
            <button 
                className="w-12 h-12 rounded-full neu-button text-[var(--accent-red)] flex justify-center items-center hover:opacity-80 active:scale-90 transition-all group"
                onClick={() => deleteHandler(id,deleteTodo)}
            >
                <Trash2 size={20} className="group-hover:scale-110 transition-transform"/>
            </button>
        </div>
    );
}