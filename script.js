// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const randomId = Math.floor(Math.random() * 1000) + 1;
  return randomId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-2"); // Add Bootstrap card classes

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "bg-light");
  cardHeader.textContent = task.title;
  card.appendChild(cardHeader);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.textContent = task.description;
  card.appendChild(cardBody);


  // Set draggable attribute for drag-and-drop functionality (optional)
  card.setAttribute("draggable", "true");
  card.addEventListener("dragstart", handleDragStart); // Add event listener for drag start

  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for (const card of taskList) {
    if (card.status === "toDo") {
      $("#todo-card").append(createTaskCard(card));
    } else if (card.status === "inProgress") {
      $("#in-progress-cards").append(createTaskCard(card));
    } else {
      $("#done-cards").append(createTaskCard)(card);
    }
  }
  $("#drag").draggable();
}
// Make lanes droppable
//makeLanesDroppable();

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault(); // Prevent default form submission

  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-description").value.trim();

  if (title) {
    const newTask = {
      id: generateTaskId(),
      title,
      description,
      status: "to-do", // Default status
    };
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Update localStorage

    renderTaskList(); // Update UI with the new task

    // Clear form fields (optional)
    document.getElementById("task-title").value = "title";
    document.getElementById("task-description").value = "description";
  } else {
    alert("Please enter a task title!");
  }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask() {
  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList)); // Update localStorage
    renderTaskList(); // Update UI with the deleted task
  }
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop() {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});
