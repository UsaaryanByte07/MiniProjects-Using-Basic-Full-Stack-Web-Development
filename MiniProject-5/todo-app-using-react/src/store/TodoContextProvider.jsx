import { createContext, useReducer } from "react";
import { todoReducer } from "./TodoReducer";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todoArray, todoDisptach] = useReducer(todoReducer, []);

  const addTodo = ({ id, todoText, todoDate }) => {
    todoDisptach({
      type: "ADD",
      payload: {
        id,
        todoText,
        todoDate,
      },
    });
  };

  const deleteTodo = (id) => {
    todoDisptach({
      type: "DELETE",
      payload: { id },
    });
  };

  const loadAllTodos = (allTodos) => {
    todoDisptach({
        type: 'LOAD_ALL',
        payload: {
            allTodos
        }
    })
  }
  return (
    <TodoContext.Provider value={{ todoArray, addTodo, deleteTodo, loadAllTodos}}>
      {children}
    </TodoContext.Provider>
  );
};
