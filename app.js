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

  // This event listener is concerned with removing a task
  taskList.addEventListener('click', removeTask);

  // This event listener is concerned with clearing a task
  clearBtn.addEventListener('click', clearTasks);

  // This event listener is concerned with filtering through the tasks for matches
  filter.addEventListener('keyup', filterTasks);

  // A DOM Event to get our tasks from Local Storage
  document.addEventListener('DOMContentLoaded', getTasks);

  // A DOM Event to change the color of the body
  document.addEventListener('mousemove', changeColor);
}

// CREATING NEW TASK
function addNewTask(e) {
  // First, ensure the input field has a value
  if (taskInput.value === '') {
    alert('Enter a task');
  } else {
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

    // Store the task in LS
    storeTaskInLS(taskInput.value);

    // Clear the input
    taskInput.value = '';
  }

  // To prevent the normal behaviour of page reloadding by the form element
  e.preventDefault();
}

// STORE TASK IN LOCAL STORAGE
function storeTaskInLS(task) {
  // Local Storage only accepts strings
  // So we initialise a variable 'tasks'
  let tasks;

  // We check whether there is an existing task in LS,
  // If there isn't we set tasks to become an array,
  // Else, we parse the task in LS and push it into the array.
  // Either way, an array must exist.
  tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));

  // Push any existing or new task to the tasks array
  tasks.push(task);

  // Set Local Storage to receive the task
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// GET TASKS FROM LS
function getTasks() {
  // Local Storage only accepts strings
  // So we initialise a variable 'tasks'
  let tasks;

  // We check whether there is an existing task in LS,
  // If there isn't we set tasks to become an array,
  // Else, we parse the task in LS and push it into the array.
  // Either way, an array must exist.
  tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(task => {
    // We create a new task with the task we are getting from the Local Storage
    const li = document.createElement('li');

    // Add a class of collection-item to the list item
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    // Create the link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    // Add an icon to the link
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to the li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);
  });
}

// REMOVE SELECTED TASK
function removeTask(e) {
  // We need to target the link element which is the parent element of the icon element
  // We also check if the link element contains the class 'delete-item'
  if (e.target.parentElement.classList.contains('delete-item')) {
    // Because we want to delete the whole list item
    // We have to traverse the DOM to get to the list item element
    // This happens to be the grandparent element of the icon element
    if (confirm('Are you sure?')) {
      // So we call remove on the list item element when we find it
      // The remove() method removes a node
      let targetElement = e.target.parentElement.parentElement;

      // REMOVE TASK FROM LOCAL STORAGE - Delete Permanently
      removeTaskFromLS(targetElement);

      targetElement.remove();
      // console.log('[list item removed]', targetElement);
    }
  }
}

function removeTaskFromLS(taskItem) {
  // Initialise a task variable
  let tasks;

  // Run comparison to check content in LS
  tasks = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));

  // Run a forEach loop to go through each task in array created and perform the deletion
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  // Call local storage to reset its collection - the array of tasks
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR ALL TASKS
function clearTasks(e) {
  // So the taskList holds what we want to clear
  // Using a while loop, we target the firstChild of the taskList
  // The loop doesn't stop till there is not a firstChild anymore

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks from Local Storage
  clearTasksFromLS();
}

// CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLS() {
  localStorage.clear();
}

// FILTER THROUGFH TASKS
function filterTasks(e) {
  // console.log(e.target.value);
  // Get the value typed into the input field
  const text = e.target.value.toLowerCase();

  // Get all the list items
  let listItem = document.querySelectorAll('.collection-item');

  // Comparison of the list items and the input value using a forEach
  listItem.forEach(task => {
    const item = task.firstChild.textContent;

    // Setting the display to block or none if a letter in the
    // tasks collection matches the letter being entered into the input field

    task.style.display = item.toLowerCase().indexOf(text) !== -1 ? 'block' : 'none';
  });
}

// Let's Play With The Background Color

// Get the target element
const header = document.querySelector('nav');
const body = document.querySelector('body');

// Get the two color values and Change the color of the NavBar
function changeColor(e) {
  let colorX = e.offsetX;
  let colorY = e.offsetY;
  body.style.backgroundColor = `rgb(${colorX}, ${colorY}, 35)`;
  // console.log('[Mouse moveX]:', e.offsetX, '[Mouse moveY]:', e.offsetY);
}
