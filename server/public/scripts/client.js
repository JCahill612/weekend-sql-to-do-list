$(document).ready(onReady);

function onReady() {
  console.log("JQ");
 //Click Listeners
  setupClickListeners();
  //get tasks from database
  getTasks();
  clearInput();
   //change status
   $("table").on("click", "#checkbox", changeTaskStatus);
   //delete
   $("#viewTasks").on("click", "button#deleteButton", deleteThisTask);
 } // end onReady
 
 function setupClickListeners() {
   $("#submitTask").on("click", function () {
     console.log("in submitTask on click");
     //validate inputs
     if (!$("#toDoItem").val()) {
       console.log("add all inputs");
       return;
     }
     let taskToSend = {
       task: $("#toDoItem").val(),
     };
     addTask(taskToSend);
     clearInput();
   });
 } //end setupClickListeners
 
 //POST Ajax call
 function addTask(taskToSend) {
   console.log("in addTask", taskToSend);
 
   $.ajax({
     type: "POST",
     url: "/tasks",
     data: taskToSend,
   }).then((response) => {
     clearInput();
     getTasks();
   });
 }// end addTask
 
 function clearInput() {
   $("#toDoItem").val("");
 }// end clearInput

 //GET
 function getTasks() {
   console.log("in getTasks");
   $("#viewTasks").empty();
 
   $.ajax({
     type: "GET",
     url: "/tasks",
   }).then(function (response) {
       console.log("in getTasks", response);
       //append Tasks to DOM
       showTaskInfo(response);
     }).catch((err) => {
       console.log("error showing tasks", err);
     });
 } //end getTasks
 

 function showTaskInfo(response) {
   for (let i = 0; i < response.length; i++) {
     if (response[i].status == "Done") {
       $("#viewTasks").append(`
             <tr>
                 <td id="check" style="font-size:32px">✓</td>
                 <td id="done">${response[i].task}</td>
                 <td></td>
                 <td></td>
                 <td>
                 <button id="deleteButton" data-id="${response[i].id}" 
                 data-task="${response[i].task}">delete
                 </button></td>
             </tr>`);
     } else {
       $("#viewTasks").append(`
         <tr id="incomplete">
             <td id="check">
             <input type="checkbox" id="checkbox" data-id="${response[i].id}"> 
             </td>
             <td>${response[i].task}</td>
             <td></td>
             <td></td>
             <td>
             <button id="deleteButton" data-id="${response[i].id}" data-task="${response[i].task}">
             delete
             </button></td>
         //     </tr>`);
     }
   }
 } //end showTaskInfo
 
 //DELETE 
 function deleteThisTask() {
   deleteTask($(this).data("id"));
 } //end delete handler
 
 //DELETE
 function deleteTask(taskId) {
   $.ajax({
     method: "DELETE",
     url: `/tasks/${taskId}`,
   }).then((response) => {
       console.log(`Deleting task`);
       getTasks(); // function to GET and display tasks
     }).catch((err) => {
       alert(`There was a problem deleting ${taskId}. Please try again.`);
     });
 }//end deleteTask
 
 function changeTaskStatus() {
   changeStatus($(this).data("id"));
 }
 
 //PUT function to update status
 function changeStatus(taskId) {
   $.ajax({
     method: "PUT",
     url: `/tasks/${taskId}`,
   }).then((response) => {
       console.log("Task status change:", response);
       getTasks(); //update display
     }).catch((err) => {
       alert("Something went wrong", err);
     });
 }// end changeStatus