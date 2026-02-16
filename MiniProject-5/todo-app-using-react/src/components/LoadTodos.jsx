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
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {!isLoading && todoArray.length === 0 && (
        <div>No Todos Remaining!! Enjoy your day</div>
      )}
    </>
  );
};
