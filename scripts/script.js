'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


const todoData = [];


const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';


  todoData.forEach(function(item,i) {
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
      render();
    });
    const todoDeleteButton = li.querySelector('.todo-remove');
    todoDeleteButton.addEventListener('click', function() {
      delete todoData[i];
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
    render();
    headerInput.value = '';
  } else {
    return alert('Введите задачу');
  }
});

render();
