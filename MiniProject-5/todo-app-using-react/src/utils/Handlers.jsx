 import {parseToClientTodoModel} from "./ParseToClientTodoModel";
 
 export const addHandler = ({ todoText, todoDate}, addTodo) => {

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({task: todoText,date: todoDate}),
    })
      .then((res) => res.json())
      .then((serverTodo) => {
        const newTodo = parseToClientTodoModel(serverTodo);
        addTodo(newTodo);
      });
  };

  export const deleteHandler = (id, deleteTodo) => {
    fetch(`http://localhost:3000/todos/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        deleteTodo(data.id);
      })
  }