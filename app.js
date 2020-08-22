const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListeners();

// load all event listeners
 function loadEventListeners(){
    // DOM loaded events
    document.addEventListener('DOMContentLoaded', getTasks);

    //add tasks
    form.addEventListener('submit', addTask);
    
    // removetask
    taskList.addEventListener('click', removeTask);

    // clear tasks
    clearBtn.addEventListener('click', clearTasks);

    // filter task
    filter.addEventListener('keyup', filterTask);
}

// get tasks
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // creating a li
        const li = document.createElement('li');
    
        // adding class to li
        li.className = 'collection-item';
    
        // creating a text node
        li.appendChild(document.createTextNode(taskInput.value));
    
        //creating a new link
        const link = document.createElement('a');
        
        // adding class to link(a)
        link.className = 'delete-item secondary-content';
    
        // adding icon to the link by innerHtml
        link.innerHTML = '<i class="fas fa-times"></i>';
    
        li.appendChild(link);
    
        // adding li to ul
        taskList.appendChild(li);
    
        // clearing the Input field
        taskInput.value = '';
        e.preventDefault();
    });
}



// add tasks
function addTask(e){
    if (taskInput.value === '') {
        confirm('Please add a task');
    }

    // creating a li
    const li = document.createElement('li');

    // adding class to li
    li.className = 'collection-item';

    // creating a text node
    li.appendChild(document.createTextNode(taskInput.value));

    //creating a new link
    const link = document.createElement('a');
    
    // adding class to link(a)
    link.className = 'delete-item secondary-content';

    // adding icon to the link by innerHtml
    link.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(link);

    // adding li to ul
    taskList.appendChild(li);

    // clearing the Input field
    taskInput.value = '';
    e.preventDefault();
}

// storing in LS
function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify('tasks'));
}


// remove task
function removeTask(e){
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

//clear tasks
function clearTasks(e){
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        if (confirm('are you sure, you want to clear all the tasks?')) {
            taskList.removeChild(taskList.firstChild);
        }
    }
}


// filter task
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}