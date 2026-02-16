export const parseToClientTodoModel = (serverTodo) => {
    const clientTodo = {
        id: serverTodo.id,
        todoText: serverTodo.task,
        todoDate: serverTodo.date
    }
    return clientTodo;
}