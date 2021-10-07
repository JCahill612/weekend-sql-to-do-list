$( document ).ready( onReady );

function onReady(){
    console.log('JS is sourced');
    getTasks();
    $('#submitBtn').on('click', handleSubmit);
}