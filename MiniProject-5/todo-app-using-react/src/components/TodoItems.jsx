import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "../store/TodoContextProvider";
import { LoadTodos } from "./LoadTodos";

export const TodoItems = () => {
  const { todoArray } = useContext(TodoContext);

  return (
    <div className="w-full flex justify-center flex-wrap my-5">
      <LoadTodos/>
      {todoArray.map(({id, todoText, todoDate}) => {
        return <TodoItem key={id} id={id} todoDate={todoDate} todoText={todoText}/>;
      })}
    </div>
  );
};
