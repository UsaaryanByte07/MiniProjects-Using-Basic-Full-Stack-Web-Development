import { useContext } from "react"
import { TodoContext } from "../store/TodoContextProvider"

export const TodoItem = () => {
    const {deleteTodo} = useContext(TodoContext);
}