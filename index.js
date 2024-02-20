// ************** DOCUMENT READY WRAPPER **************

$(document).ready(function() {
  var filterResults = function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    getAndDisplayTasks();
  }
  
  // ************** GET & DISPLAY TASKS  **************
  var getAndDisplayTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1193',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();

        var returnActiveTasks = response.tasks.filter(function (task) {
          if (!task.completed) {
            return task.id;
          }
        });
        
        var returnCompletedTasks = response.tasks.filter(function (task) {
          if (task.completed) {
            return task.id;
          }
        });
  
        var filter = $('.active').attr('id');
  
        if (filter === 'all' || filter === '') {
          taskItems = response.tasks;
        }
        if (filter === 'active') {
          taskItems = returnActiveTasks;
        }
        if (filter === 'completed') {
          taskItems = returnCompletedTasks;
        }
  
        var sortedItems = taskItems.sort(function (a, b) {
          return Date.parse(a.created_at) - Date.parse(b.created_at);
        });
        
        sortedItems.forEach(function (task) {
          var taskContent = `
          <div class="to-do">
            <div class="left-side">
              <button class="select" data-id="${task.id}" data-completed="${task.completed}">
                <ion-icon name=${task.completed ? "checkmark-circle-outline" : "ellipse-outline"} size="large"></ion-icon>
              </button>
              <p class=${task.completed ? "task-content-completed" : "task-content"}>${task.content}</p>
            </div>
            <button class="delete" data-id="${task.id}"><ion-icon name="close-outline" size="large"></ion-icon></button>
          </div>
        `;
        $('#todo-list').append(taskContent);
        })

        $('.to-do-amount span').text(returnActiveTasks.length);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  // ************** CREATE TASK **************

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1193',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  // ************** DELETE TASK **************

  var deleteTask = function (id) {
    $.ajax({
      type:'DELETE',
      url: `https://fewd-todolist-api.onrender.com/tasks/${id}?api_key=1193`,
      success: function (response, textStatus) {
        getAndDisplayTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function() {
    deleteTask($(this).data('id'));
  });

  // ************** MARK TASK COMPLETE **************

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: `https://fewd-todolist-api.onrender.com/tasks/${id}/mark_complete?api_key=1193`,
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  // ************** MARK TASK ACTIVE **************

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: `https://fewd-todolist-api.onrender.com/tasks/${id}/mark_active?api_key=1193`,
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.select', function() {
    if ($(this).data('completed')) {
      markTaskActive($(this).data('id'));
    } else {
      markTaskComplete($(this).data('id'));
    }
  });

  // ************** DISPLAY & FILTER LATEST DATA **************

  getAndDisplayTasks();

  $('.to-do-filter button').on('click', filterResults);
});