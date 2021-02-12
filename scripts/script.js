'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
let todoDataJSON;
localStorage.setItem = ('tasks', []);

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  let todoDataLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if (todoDataLocalStorage  === null) {
    todoDataLocalStorage = [];
  }

  todoDataLocalStorage.forEach(function(item,i) {
    if (item === null) {
      return;
    }

    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
    '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' + 
      '<button class="todo-complete"></button>' + 
    '</div>';
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const todoCompletedButton = li.querySelector('.todo-complete');
    todoCompletedButton.addEventListener('click', function() {
      item.completed = !item.completed;
      localStorage.tasks = JSON.stringify(todoDataLocalStorage);
      render();
    });

    const todoDeleteButton = li.querySelector('.todo-remove');
    todoDeleteButton.addEventListener('click', function() {
      delete todoData[i];
      todoDataJSON = JSON.stringify(todoData);
      localStorage.tasks = todoDataJSON;
      render();
    });
  });

};


todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if (headerInput.value.trim() !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    todoDataJSON = JSON.stringify(todoData);
    localStorage.tasks = todoDataJSON;
    render();
    headerInput.value = '';
  } else {
    return alert('Введите задачу');
  }
});

render();
