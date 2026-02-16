import { useContext } from "react";
import { TodoContext } from "../store/TodoContextProvider";

export const AddTodo = () => {

    const {addTodo} = useContext(TodoContext);
    
};
