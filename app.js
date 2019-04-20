// The UI Variables

// The form
const form = document.querySelector('#task-form');

// The form input
const taskInput = document.querySelector('#task');

// The clear tasks button
const clearBtn = document.querySelector('.clear-tasks');

// The filter input
const filter = document.querySelector('#filter');

// The task list - ul
const taskList = document.querySelector('.collection');

// A function to Load all the Event Listeners at once

loadAllEventListeners();

function loadAllEventListeners() {
  // This event listener is concerned with submitting a new task
  form.addEventListener('submit', addNewTask);
}

// Creating the addNewTask function

function addNewTask(e) {
  // First, ensure the input field has a value
  if (taskInput.value === '') {
    alert('Enter a task');
  }

  // The user is then expected to enter a task
  // This task should be added to the task list as a list item
  // The list item is generated dynamically

  // Create the li element
  const li = document.createElement('li');

  // Add a class of collection-item to the list item
  li.className = 'collection-item';

  // When a new task is created, the task name is expected to be seen as a list item
  // Hence we attach the taskInput value to enable this.
  li.appendChild(document.createTextNode(taskInput.value));

  // Each task can be deleted from the task list
  // Deletion is made possible via a link that is appended to the list item

  // Create the link
  const link = document.createElement('a');

  // Add a class of delete-item and secondary-content to the link
  // secondary-item is a matrerialize helper class that positions its element to the RHS of a host element
  link.className = 'delete-item secondary-content';

  // Add an icon to the link
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to the li
  li.appendChild(link);

  // Append the li to the ul
  taskList.appendChild(li);

  // Clear the input
  taskInput.value = '';

  // To prevent the normal behaviour of page reloadding by the form element
  e.preventDefault();
}
