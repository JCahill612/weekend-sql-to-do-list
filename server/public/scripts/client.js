$( document ).ready( onReady );

function onReady(){
    console.log('Hey JQuery!');
    getTasks();
    $('#submitBtn').on('click', handleSubmit);
    $('#taskList').on('check', '.deleteBtn', function() {
        let el = $(this).closest('tr').data('id');
        removeTask(el);
    });
    $('#taskList').on('click', '.markComplete', function(event) {
        event.preventDefault();
        let task = $(this).closest('tr');
        let taskId = task.data('id');
        console.log('ready to complete task of id:', taskId);
        completeTask(taskId);
        toggleComplete(task);
    });
}
// function to send GET request to server, gets response of all tasks
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( response => {
        let tasks = response;
        console.log(tasks);
        renderTaskList(tasks);
    }).catch( err => {
        console.log('Error in getting tasks', err);
    })
}
// function to append all tasks from database to DOM
function renderTaskList(taskList) {
    $('#taskList').empty();
    
    for (let task of taskList) {
        $('#taskList').append(`
        <tr data-id=${task.id}>
        <td class="info">${task.taskInfo}</td>
        <td><input type="checkbox" class="markComplete"></input></td>
        <td><button class="deleteBtn">Delete</button></td>
        </tr>
        `);
    }
}

// POST request to server with task object as data, calls getTasks to refresh list after response
function addTask(taskToAdd) {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then( response => {
        console.log('Response from server', response);
        getTasks();
    }).catch( err => {
        console.log('error in adding task', err);
        alert('Unable to add task right now, please try again later.');
    });
}
// prevents default form attributes, gets input value into an object and passes it to addTask
function handleSubmit(event) {
    event.preventDefault();
    console.log('click on addTask button!');
    let newTask = {
        description: $('#task-in').val(),
    };
    $('#task-in').val('');
    addTask(newTask);
}

function toggleComplete(row) {
    row.toggleClass('complete');
}

function completeTask(idToComplete) {
    console.log('completing task with id:', idToComplete);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToComplete}`
      })
      .then( response => {
        getTasks();
      })
      .catch( err => {
        console.log('ERROR', err);
        alert('Unable to complete task, please try again later.');
      });

    }


// called after clicking delete button, removes a task from database and refreshes DOM
function removeTask(idToRemove) {
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToRemove}`
    }).then( response => {
        getTasks();
    }).catch( err => {
        console.log('error in delete', err);
        alert('Unable to delete task, please try again later.')
    });
}
