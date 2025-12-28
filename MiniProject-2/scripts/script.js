const nameInput = document.getElementById("task-name");
const dateInput = document.getElementById("due-date");
const timeInput = document.getElementById("due-time");
const descInput = document.getElementById("task-description");
const addTaskBtn = document.body.getElementsByClassName("task-add-btn")[0];
const allTaskClearBtn =
  document.body.getElementsByClassName("all-task-clear-btn")[0];
const tasksContainer =
  document.body.getElementsByClassName("tasks-container")[0];

function sortTasks(taskArray) {
  /* HOW THE COMPARE FUNCTION WORKS:
  The .sort() method uses a "Compare Function" to determine the order of elements by 
  evaluating two values at a time, traditionally called 'a' and 'b'. The engine 
  repeatedly calls this function and looks at the numerical result to decide 
  if it needs to swap the elements:

  1. If the function returns a NEGATIVE value (e.g., -1), it tells JavaScript 
     that 'a' is "smaller" or should come before 'b'. The order remains [a, b].
  2. If the function returns a POSITIVE value (e.g., 1), it tells JavaScript 
     that 'b' is "smaller" or should come before 'a'. The elements are swapped 
     to the order [b, a].
  3. If the function returns ZERO (0), it treats 'a' and 'b' as equal in terms 
     of sorting and leaves their positions unchanged relative to each other.

  In a To-Do list, subtracting booleans (a.isComplete - b.isComplete) works 
  because 'false' becomes 0 and 'true' becomes 1. Therefore, (0 - 1) gives -1 
  (incomplete stays first), while (1 - 0) gives 1 (complete moves to the back).
*/
  // .sort() modifies the original array
  taskArray.sort((a, b) => {
    // If 'a' is complete and 'b' is not, move 'a' to the end (return 1)
    // If 'a' is NOT complete and 'b' is, keep 'a' at the start (return -1)
    return a.isComplete - b.isComplete;
  });
}

function updateTaskListUI() {
  tasksContainer.innerHTML = "";
  const taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
  if (taskArray.length > 0) {
    taskArray.forEach((task) => {
      let taskCard = document.createElement("div");
      if (task.isComplete == false) {
        taskCard.setAttribute("class", "task-card");
        taskCard.innerHTML = `
          <div class="task-name-container task-primary-details">${task.taskName}</div>
          <div class="task-datetime-container task-primary-details">Task Deadline is on ${task.taskDueDate} at ${task.taskDueTime}</div>
          <div class="task-description-container task-secondary-details">
            <div class="task-description-heading">Task Description</div><br />
            ${task.taskDescription}
          </div>
          <button class="delete-task task-edit-btns" data-task-id="${task.taskName}">Delete</button>
          <button class="completed-task task-edit-btns" data-task-id="${task.taskName}">Completed</button>
          `;
        tasksContainer.appendChild(taskCard);
        return;
      }
      if (task.isComplete == true) {
        taskCard.setAttribute("class", "task-card task-card-status-complete");
        taskCard.innerHTML = `
          <div class="task-name-container task-primary-details task-primary-details-status-complete">${task.taskName}</div>
          <div class="task-datetime-container task-primary-details task-primary-details-status-complete">Task Deadline is on ${task.taskDueDate} at ${task.taskDueTime}</div>
          <div class="task-description-container task-secondary-details task-description-container-status-complete">
            <div class="task-description-heading task-description-heading-status-complete">Task Description</div><br />
            ${task.taskDescription}
          </div>
          <button class="delete-task task-edit-btns task-edit-btns-status-complete" data-task-id="${task.taskName}">Delete</button>
          <button class="completed-task task-edit-btns task-edit-btns-status-complete" data-task-id="${task.taskName}">Completed</button>
          `;
        tasksContainer.appendChild(taskCard);
        return;
      }
    });
  }
}

function storeTask() {
  let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskName = nameInput.value;
  let taskDueDate = dateInput.value;
  let taskDueTime = timeInput.value;
  let taskDescription = descInput.value;

  if (!taskName || !taskDueDate || !taskDueTime || !taskDescription) {
    alert("Please Fill all the details of the task to Add it..");
    return;
  }
  let isDupliacte = false;
  if (taskArray.length > 0) {
    taskArray.forEach((task) => {
      if (task.taskName.toLowerCase() === nameInput.value.toLowerCase()) {
        isDupliacte = true;
      }
    });
  }

  if (isDupliacte) {
    alert(
      "A Task with the Same Name Already Exist Please Give a Unique Name to the Task.."
    );
    return;
  }

  let task = {
    taskName,
    taskDueDate,
    taskDueTime,
    taskDescription,
    isComplete: false,
  };

  taskArray.push(task);
  sortTasks(taskArray);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  nameInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  descInput.value = "";
}

function updateTaskStatus(taskName) {
  let taskArray = JSON.parse(localStorage.getItem("tasks"));
  let newTaskArray = taskArray.map((task) => {
    if (task.taskName == taskName) {
      task.isComplete = !task.isComplete;
    }
    return task;
  });
  sortTasks(newTaskArray);
  localStorage.setItem("tasks", JSON.stringify(newTaskArray));
}

function deleteTask(taskName) {
  let taskArray = JSON.parse(localStorage.getItem("tasks"));
  let newTaskArray = taskArray.map((task) => {
    if (task.taskName != taskName) {
      return task;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(newTaskArray));
}

function clearAllTask() {
  let userConfirmation = confirm(
    "Are Your Sure You Want to Clear the Whole To do List.\nClick OK if You want to Clear the Whole To do List\nClick Cancel if You want don't want to Clear the whole To do List"
  );
  if (userConfirmation) {
    localStorage.removeItem("tasks");
  }
}

updateTaskListUI();

addTaskBtn.addEventListener("click", () => {
  storeTask();
  updateTaskListUI();
});

allTaskClearBtn.addEventListener("click", () => {
  clearAllTask();
  updateTaskListUI();
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("completed-task")) {
    let taskName = e.target.getAttribute("data-task-id");
    updateTaskStatus(taskName);
    updateTaskListUI();
    return;
  }

  if (e.target.classList.contains("delete-task")) {
    let taskName = e.target.getAttribute("data-task-id");
    let userConfirmation = prompt(
      `Are you Sure that you want to Delete the Task "${taskName}" ..?`
    );
    if (userConfirmation) {
      deleteTask(taskName);
      updateTaskListUI();
    }
    return;
  }
});
