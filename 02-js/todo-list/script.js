const button = document.getElementById('add');
const input = document.getElementById('input');
const todosContainer = document.getElementById('todosContainer');

let todoList = [];
let text = '';
input.addEventListener('keyup', function (e) {
    button.disabled = false;
    text = e.target.value;
    console.log(todoList);
});

function completeTodo() {
    const clicked = todoList.find(todo => todo.text === this.id);

    clicked.done ? this.classList.remove('done') : this.classList.add('done');
    const newList = todoList.map(todo => {
        if (todo.text === this.id) {
            return { ...todo, done: !todo.done };
        }
        return todo;
    });
    todoList = [...newList];
}

function removeTodo() {
    const id = this.parentNode.id;
    const clicked = todoList.find(todo => todo.text === id);

    const newList = todoList.filter(todo => todo.text !== clicked.text);
    console.log(newList);
    todoList = [...newList];
    document.getElementById(id).remove();
}


button.addEventListener('click', function (e) {
    e.preventDefault();
    const existTodo = todoList.filter(item => item.text === text);
    if (existTodo.length > 0 || text === '') {
        button.setAttribute('disabled', true);
        return;
    }
    const todo = { text: text, done: false };
    todoList.push(todo);

    const todoItem = document.createElement('li');

    const liText = document.createElement('p');
    todoItem.appendChild(liText);

    todoItem.id = todoList.at(-1).text;
    liText.id = todoList.at(-1).text;
    liText.textContent = todoList.at(-1).text;
    liText.onclick = completeTodo;

    const removeTodoBtn = document.createElement('button');
    removeTodoBtn.classList.add('outline');
    removeTodoBtn.textContent = 'Remove';
    removeTodoBtn.onclick = removeTodo;

    todoItem.appendChild(removeTodoBtn);
    todosContainer.appendChild(todoItem);

    input.value = '';
    input.focus();
});
