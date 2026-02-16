export const todoReducer = (currentTodos, action) => {
  switch (action.type) {
    case "ADD":
      return [...currentTodos, {id: action.payload.id, todoText: action.payload.todoText, todoDate: action.payload.todoDate}];
    case "DELETE": 
      return currentTodos.filter(todo => todo.id !== action.payload.id);
    case "LOAD_ALL":
        return action.payload.allTodos;
    default:
      return currentTodos
  }
};
