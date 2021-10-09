$( document ).ready( onReady );

function onReady(){
    console.log('Hey JQuery!');
    getTasks();
    $('#submitBtn').on('click', handleSubmit);
    $('#taskList').on('check', '.deleteBtn', function(event) {
        let taskId = $(this).closest('tr').data('id');
        console.log('clicked delete button for task with id:', taskId);
        removeTask(taskId);
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