// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomId=Math.floor(Math.random() * 1000) + 1
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-2'); // Add Bootstrap card classes
  
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'bg-light');
    cardHeader.textContent = task.title;
    card.appendChild(cardHeader);
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.textContent = task.description;
    card.appendChild(cardBody);
  
    // Add a delete button (optional)
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => handleDeleteTask(task.id));
    card.appendChild(deleteButton);
  
    // Set draggable attribute for drag-and-drop functionality (optional)
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', handleDragStart); // Add event listener for drag start
  
    return card;
  }
    

        
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
