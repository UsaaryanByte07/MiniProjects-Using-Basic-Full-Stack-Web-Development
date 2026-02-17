import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../store/TodoContextProvider";
import { parseToClientTodoModel } from "../utils/ParseToClientTodoModel";

export const LoadTodos = () => {
  const { todoArray, loadAllTodos } = useContext(TodoContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((serverTodos) => {
        const clientTodos = serverTodos.map((todo) =>
          parseToClientTodoModel(todo),
        );
        loadAllTodos(clientTodos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center py-8">
            <div className="w-16 h-16 rounded-full neu-flat bg-[var(--bg-color)] flex items-center justify-center animate-[spin_2s_linear_infinite]">
                 <div className="w-12 h-12 rounded-full neu-pressed relative">
                    <span className="absolute top-1 left-4 w-4 h-4 bg-[var(--accent-blue)] rounded-full shadow-[0_0_10px_var(--accent-blue)]"></span>
                 </div>
            </div>
        </div>
      )}
      {!isLoading && todoArray.length === 0 && (
        <div className="w-full flex justify-center py-6">
            <div className="px-8 py-4 rounded-2xl neu-pressed text-[var(--text-secondary)] font-medium text-lg">
                No Todos Remaining!! Enjoy your day
            </div>
        </div>
      )}
    </>
  );
};
