const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}


const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

window.onload = function (){
  //add eventlistener for enter button on input txt
  const input  = document.getElementById('input_todo');
  if(input){
    input.addEventListener("keyup", function(e){
      if (e.keyCode === 13){
        newTodo();
      }
    });
  }
}

function newTodo() {
  
  const list = document.getElementById('todo-list');
  const li = document.createElement('li');
  const text = document.getElementById('input_todo');
     
  const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.value = "value";
    checkbox.id = "todo-checkbox";

  const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick="removeTodo(this)";

  if (text.value=="")  {
    alert ("You seemed to forget to type a new task");
  }
  else {
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(text.value));
        
    li.appendChild(deleteButton);
    list.appendChild(li); 

    //add event listeners for delete and checkbox
    checkbox.addEventListener("click",checkboxChange);
    deleteButton.addEventListener("click",removeTodo);

    //clear input box from previously added item
    document.getElementById('input_todo').value = "";

    //update list count span
    updateTotalListCount();

    //update unchecked count
    updateTotalUncheckedListCount()

  } 
}

function removeTodo(event){
  var li = event.target.parentElement;
  var ul = document.getElementById("todo-list");
  var selTask = li.innerText;
  var liTask = selTask.replace("Delete","");

  
  var confirmDelete = confirm("You are about to delete " + "'" +  liTask + "'" +  " todo task");
  if (confirmDelete){
    ul.removeChild(li);
  }
  
  //update span with count of total items after items have been removed
  updateTotalListCount();
  updateTotalUncheckedListCount();
}

function updateTotalListCount(){
  //get list count
  var toDoList = document.getElementById('todo-list').getElementsByTagName('li');
  var listCount = toDoList.length;

  //update list count with new list length after new item has been added/removed
  document.getElementById('item-count').innerHTML = listCount;
  
}
function updateTotalUncheckedListCount(){
  
  var toDoList = document.getElementById('todo-list').getElementsByTagName('input');
  var listCount = toDoList.length;
  var checkedCount = 0;
  var uncheckedCount = 0;


  //loop thru the list items and get a count of unchecked list items
  for (var i=0; i<listCount; i++){
    if(toDoList[i].type =="checkbox" && toDoList[i].checked == true){
      checkedCount++;
    }
    else{
        uncheckedCount++;
    }
  }
  //console.log("unCheckedCount:" + uncheckedCount);
  document.getElementById('unchecked-count').innerHTML = uncheckedCount;
}

function checkboxChange(){
  //console.log("insidecalcUncheckfunction");
  updateTotalUncheckedListCount();
}





