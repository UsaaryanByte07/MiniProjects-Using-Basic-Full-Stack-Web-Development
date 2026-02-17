import { parseToClientTodoModel } from "./ParseToClientTodoModel";

export const handleAddClick = (
  event,
  { todoText, todoDate },
  addTodo,
  setAlertMessage,
) => {
  event.preventDefault();
  const result = addHandler({ todoText, todoDate }, addTodo);
  if (result === "ALL_EMPTY") {
    setAlertMessage("Both Fields are Empty");
  } else if (result === "EMPTY_TODOTEXT") {
    setAlertMessage("Todo Text shouldn't be Empty");
  } else if (result === "EMPTY_TODODATE") {
    setAlertMessage("Todo Date shouldn't be Empty");
  } else {
    setAlertMessage("");
  }
};

export const addHandler = ({ todoText, todoDate }, addTodo) => {
  const task = todoText.current.value;
  const date = todoDate.current.value;

  if (task === "" && date === "") {
    return "ALL_EMPTY";
  } else if (task === "") {
    return "EMPTY_TODOTEXT";
  } else if (date === "") {
    return "EMPTY_TODODATE";
  } else {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, date }),
    })
      .then((res) => res.json())
      .then((serverTodo) => {
        todoDate.current.value = "";
        todoText.current.value = "";
        const newTodo = parseToClientTodoModel(serverTodo);
        addTodo(newTodo);
      });
  }
};

export const deleteHandler = (id, deleteTodo) => {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      deleteTodo(data.id);
    });
};
