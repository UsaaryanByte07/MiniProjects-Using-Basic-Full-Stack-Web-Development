import { TodoContextProvider } from "../store/TodoContextProvider";
import { AddTodo } from "./AddTodo"
import { LoadTodos } from "./LoadTodos";
import { TodoItems } from "./TodoItems"

export const AppTodoContainer = () => {
    return (
        <TodoContextProvider>
            <div>
                <AddTodo/>
                <TodoItems/>
            </div>
        </TodoContextProvider>
    );
}