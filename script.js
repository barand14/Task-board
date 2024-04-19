let nextId = JSON.parse(localStorage.getItem("nextId"))

// Retrieve tasks and nextId from localStorage
function generateTaskId() {
  if(nextId === null) {
    nextId = 0
  }

  else {
       nextId++; // Use a sequential ID generator
  }
  localStorage.setItem("nextId", JSON.stringify(nextId))

  return nextId

}

// 2. Create Task Card
function createTaskCard(task) {
  const taskCard = $('<div>')
  .addClass('card w-75 task-card draggable my-3')
  .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
  .addClass('btn btn-danger delete')
  .text('Delete')
  .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);
  
  // set card background color based on due date
  if (task.dueDate && task.status !== 'done') {
  const now = dayjs();
  const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
  if (now.isSame(taskDueDate, 'day')) {
  taskCard.addClass('bg-warning text-white');
  } else if (now.isAfter(taskDueDate)) {
  taskCard.addClass('bg-danger text-white');
  cardDeleteBtn.addClass('border-light');
  }
  }
  
  // append card elements
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  
  return taskCard;
}

// 3. Render Task List
function renderTaskList() {
  $("#todo-cards, #in-progress-cards, #done-cards").empty(); // Clear existing tasks

  taskList.forEach(task => {
    // const laneId = "#" + task.status;
    // $(laneId).append(createTaskCard(task));

  if(task.status === "in-progress"){
    $("#in-progress-cards").append(createTaskCard(task))
  }
  else if(task.status === "done") {
    $("#done-cards").append(createTaskCard(task))
  }

  else {
    $("#todo-cards").append(createTaskCard(task))

  }

  });

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // function to clone the card being dragged so that the original card remains in place
    helper: function (e) {
    // check of the target of the drag event is the card itself or a child element if it is the card itself, clone it, otherwise find the parent card and clone that
    const original = $(e.target).hasClass('ui-draggable')
    ? $(e.target)
    : $(e.target).closest('.ui-draggable');
    return original.clone().css({
    maxWidth: original.outerWidth(),
    });
    },
    });

}

// 4. Make Lanes Droppable
// function makeLanesDroppable() {
//   $(".lane").droppable({ // Correct selector for lanes
//     accept: ".card",
//     drop: handleDrop,
//   });
// }

// 5. Handle Add Task
function handleAddTask(event) {
  event.preventDefault();

  const title = $("#task-title").val().trim();
  const description = $("#task-description").val().trim();

  if (title) {
    const newTask = {
      id: generateTaskId(),
      title,
      description,
      status: "todo",
    };
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    console.log(newTask)

    renderTaskList();
    
    // Clear form fields
    $("#task-title").val("");
    $("#task-description").val("");
  } else {
    alert("Please enter a task title!");
  }
}

// 6. Handle Delete Task
function handleDeleteTask(droppedTaskId, newStatus) {
  const droppedTaskIndex = taskList.findIndex(task => task.id === droppedTaskId);
  if (droppedTaskIndex !== -1) {
    taskList[droppedTaskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  } else {
    console.error(`Task with ID "${droppedTaskId}" not found in tasklist`);
  }
}

// 7. Handle Drop
function handleDrop(event, ui) {
  event.preventDefault();
  const droppedTaskId = ui.draggable.data("task-id");
  console.log(droppedTaskId)
  const newLaneId = $(this).attr("id");
  console.log(newLaneId)

  let newStatus;
  switch (newLaneId) {
    case "to-do":
      newStatus = "to-do";
      break;
    case "in-progress":
      newStatus = "in-progress";
      break;
    case "done":
      newStatus = "done";
      break;
    default:
      console.error("Invalid lane ID");
      return;
  }

  updateTaskStatus(droppedTaskId, newStatus); // Update task status
}

// New function to update task status
function updateTaskStatus(taskId, newStatus) {
  const taskIndex = taskList.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    taskList[taskIndex].status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
  } else {
    console.error(`Task with ID "${taskId}" not found in tasklist`);
  }
}

// 8. Document Ready
$(document).ready(function () {
  taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

  $("#task-form").on("submit", handleAddTask)
  $(".lane").droppable({ // Correct selector for lanes
    accept: ".draggable",
    drop: handleDrop,
  });
  renderTaskList();
  //makeLanesDroppable();
});