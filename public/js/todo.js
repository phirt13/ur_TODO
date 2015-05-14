$(function() {

  var $list = $('#active-tasks');
  var $newTaskForm = $('#new-task-form');
  var $newTaskButton = $('#new-task-button');
  var $closeTaskButton = $('#close-options');
  var $editTasksButton = $('#edit-tasks');
  var $clearCompleteButton = $('#clear-complete');
  var $deleteTaskButton = $('#delete-task');

  $newTaskForm.hide();
  $closeTaskButton.hide();
  $deleteTaskButton.hide();

  $newTaskButton.click(function() {
    localStorage.setItem('visited', JSON.stringify(1));
    $newTaskButton.hide();
    $editTasksButton.hide();
    $clearCompleteButton.hide();
    $('#complete-task').hide();
    $newTaskForm.fadeIn(800);
    $closeTaskButton.fadeIn(800);
    $('.complete').off();
  });

  $newTaskForm.submit(function() {
    event.preventDefault();
    if(($('input').val() === '')) {
    $('input').attr('placeholder', 'cannot add empty tasks');
    } else {
      var taskText = $('input:text').val();
      $list.append('<li class="todo-task"><textarea disabled id="task-content">' + taskText + '</textarea></li>');
      $('input:text').val('');
      $('input').attr('placeholder', 'new task');
      complete();
      $('.complete').off();
    }
  });

  $closeTaskButton.click(function() {
    $newTaskForm.hide();
    $closeTaskButton.hide();
    $newTaskButton.fadeIn(800);
    $editTasksButton.fadeIn(800);
    $clearCompleteButton.fadeIn(800);
    $('li').each(function() {
      $(this).children('button').remove();
    });
    $('textarea').each(function() {
      $(this).prop("disabled", true);
    });
    $('textarea:not(#task-complete').each(function() {
      $(this).attr('id', 'task-content');
    });
    $('input').attr('placeholder', 'new task');
    complete();
    $('.complete').off();
  });

  $clearCompleteButton.click(function() {
    $('.complete').fadeOut(800);
  });

  $editTasksButton.click(function() {
    $('#complete-task').hide();
    $('li').off();
    $('li').each(function() {
      $(this).append('<button class="delete-task">del</button>');
    });
    $('button').filter('.delete-task').each(function() {
      $(this).click(function() {
        $(this).parent().remove();
      });
    });
    $('textarea:not(#task-complete)').each(function() {
      $(this).prop("disabled", false);
      $(this).attr('id', 'edit-task-content');
    });
    $newTaskButton.hide();
    $editTasksButton.hide();
    $clearCompleteButton.hide();
    $closeTaskButton.fadeIn(800);
  });

  function complete() {
    $('li:not(#complete)').click(function() {
      var $this = $(this);
      $('#complete-task').remove();
      $this.append('<button id="complete-task">complete</button>');
      var $completeTaskButton = $('#complete-task');
      $completeTaskButton.hide();
      $completeTaskButton.fadeIn();
      $completeTaskButton.click(function () {
        $this.attr('class','complete');
        $this.children('textarea').attr('id', 'task-complete');
        $this.remove();
        $('#finished-tasks').append($this);
        $this.hide();
        $this.fadeIn(800);
        $this.off();
        $completeTaskButton.remove();
      });
    });
  }
  complete();

});
