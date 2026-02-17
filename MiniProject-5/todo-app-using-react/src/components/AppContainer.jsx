import { TodoContextProvider } from "../store/TodoContextProvider";
import { AddTodo } from "./AddTodo";
import { TodoItems } from "./TodoItems";
import { Header } from "./Header";

export const AppTodoContainer = () => {
  return (
    <TodoContextProvider>
      <div className="flex justify-center flex-wrap mt-20 p-8 rounded-3xl neu-flat bg-[var(--bg-color)] max-w-4xl mx-auto">
        <Header />
        <AddTodo />
        <TodoItems />
      </div>
    </TodoContextProvider>
  );
};
