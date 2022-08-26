const button = document.getElementById('add');
const input = document.getElementById('input');
const todosContainer = document.getElementById('todosContainer');

let todoList = [];
let textId = '';
input.addEventListener('keyup', function (e) {
    button.disabled = false;
    textId = e.target.value;
    console.log(todoList);
});

button.addEventListener('click', function (e) {
    e.preventDefault();
    const existTodo = todoList.filter(item => item.text === textId);
    if (existTodo.length > 0) {
        button.setAttribute('disabled', true);
        return;
    }
    const todo = { text: textId, done: false };
    todoList.push(todo);

    const todoItem = document.createElement('li');
    todoItem.id = todoList.at(-1).text;
    todoItem.textContent = todoList.at(-1).text;
    todoItem.onclick = function () {
        const clicked = todoList.find(todo => todo.text === this.id);

        clicked.done ? this.classList.remove('done') : this.classList.add('done');
        const newList = todoList.map(todo => {
            if (todo.text === this.id) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        todoList = [...newList];
    };

    todosContainer.appendChild(todoItem);

    input.value = '';
    input.focus();
});
