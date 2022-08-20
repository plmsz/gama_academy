const button = document.getElementById('add')
const input = document.getElementById('input')
const todos = document.getElementById('todoContainer')
const todoList = document.createElement('ul')
todos.append(todoList)

let text=''

input.addEventListener('keyup',function(e) {
    text = e.target.value
})

button.addEventListener('click', function (e) {
    e.preventDefault()
    const todoItem = document.createElement('li')
    todoList.appendChild(todoItem)

    todoItem.textContent = text

    input.value = ''
    input.focus()
})