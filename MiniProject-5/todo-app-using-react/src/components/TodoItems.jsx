import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "../store/TodoContextProvider";
import { LoadTodos } from "./LoadTodos";

export const TodoItems = () => {
  const { todoArray } = useContext(TodoContext);

  return (
    <div>
      <LoadTodos/>
      {todoArray.map(() => {
        return <TodoItem />;
      })}
    </div>
  );
};
