document.addEventListener('DOMContentLoaded', function() {
  // Code placed here will run when the DOM content has loaded.

  var todoList = document.getElementById('todo-list');
  var todoInput = document.getElementById('todo-input');
  var addButton = document.getElementById('add-button');
  var todoCount = 0;

  // addTodo function will dynamically add a div element
  // containing the description to the todo-list div.
  var addTodo = function() {
    // Create a div element and assign it to todoCol variable.
    var todoCol = document.createElement('div');
    // Give it a class of col-xs-12 and todo.
    todoCol.setAttribute('class', 'col-xs-12 todo');
  
    // Create another div element and assign it to todoRow variable.
    var todoRow = document.createElement('div');
    // Give it a class of row.
    todoRow.setAttribute('class', 'row');
  
    // Create a button element and assign it to removeButton variable.
    var removeButton = document.createElement('button');
  
    // Set class attribute of removeButton as btn, btn-danger and remove-button.
    removeButton.setAttribute('class','btn btn-danger remove-button');
  
    // Add the string "REMOVE" into the innerHTML of removeButton.
    removeButton.innerHTML = "REMOVE";
  
    // Define the event listener for click so that this todoCol element
    // will be removed when the user clicks removeButton
    removeButton.onclick = function() {
      // We use 'this' to point to the remove button element.
      // this.parentNode.parentNode will assign todoCol to variable child
      var child = this.parentNode.parentNode;
  
      // We use the removeChild method to delete child from the todo-list
      todoList.removeChild(child);
      
      //  remove 1 from todoCount
      todoCount--;
    };
  
    // Create an h5 element and assign it to the h5 variable.
    var h5 = document.createElement('h5');
  
    // Sets the class attribute of h5 to take up 8 columns.
    h5.setAttribute('class', 'col-xs-8');
  
    // Assign the value of todoInput, which is the text the user typed
    // into the input element, to the innerHTML property of h5.
    h5.innerHTML = todoInput.value;
  
    // Add h5 as the last child element to the todoRow element.
    todoRow.appendChild(h5);
  
    // Add removeButton as the last child element to todoRow.
    todoRow.appendChild(removeButton);
  
    // Add todoRow as the last child element to the todoCol element.
    todoCol.appendChild(todoRow);
  
    // Append todoCol as the last child element to the todoList div.
    todoList.appendChild(todoCol);
  };

  var checkThenAddTodo = function () {
    // First we make sure that there is less than 10 to-dos,
    // and some value exists in the input element.
    if (todoCount < 10 && todoInput.value !== '') {
  
      // Executes the addTask function we defined earlier.
      addTodo();
  
      // Add 1 to taskCount.
      todoCount++;
  
      // Clear the input element by setting it to empty string.
      todoInput.value = '';
    }
  }
  
  addButton.addEventListener('click', checkThenAddTodo);
  
  todoInput.addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
      checkThenAddTodo();
    }
  });
});