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
    const id = this.id;
    const clicked = todoList.find(todo => todo.text === id);

    const newList = todoList.filter(todo => todo.text !== clicked.text);
    todoList = [...newList];
    document.getElementById(id).remove();
}
function editTodo() {
    const id = this.id;
    const clicked = todoList.find(todo => todo.text === id);
    Array.from(document.querySelectorAll('p')).find(el => el.id === id).remove();
    const inputEdit = document.createElement('input');
    inputEdit.type = text;
    inputEdit.value = id;
    const li = document.getElementById(id);
    li.insertBefore(inputEdit, li.children[0]);
    const newLiText = document.createElement('p');

    inputEdit.addEventListener('blur', function (e) {
        const newText = e.target.value;
        inputEdit.id = `${newText}-input`;

        const exist = verifyExistTodo(newText, true);
        if (exist) {
            return;
        }
        newLiText.textContent = newText;
        newLiText.id = newText;
        li.id = newText;
        const btnDiv = document.getElementById(`${id}-div`);
        btnDiv.remove();
        createBtnDiv(li, newLiText);
        li.insertBefore(newLiText, li.children[0]);
        inputEdit.remove();

        const newList = todoList.map(todo => {
            if (todo.text === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        todoList = [...newList];
    });
    inputEdit.addEventListener('keydown', function () {
        inputEdit.removeAttribute('aria-invalid', true);
    });
}

function verifyExistTodo(todo = text, isEditing = false) {
    const existTodo = todoList.filter(item => item.text === todo);
    if (existTodo.length > 0 || todo === '') {
        if (isEditing) {
            const input = document.getElementById(`${todo}-input`);
            input.setAttribute('aria-invalid', true);
        } else {
            button.setAttribute('disabled', true);
        }
        return true;
    }
}

function createBtnDiv(todoItem, liText) {
    liText.onclick = completeTodo;
    const id = liText.textContent;
    const divBtn = document.createElement('div');
    divBtn.id = `${id}-div`;
    todoItem.appendChild(divBtn);

    const removeTodoBtn = document.createElement('button');
    removeTodoBtn.classList.add('outline');
    removeTodoBtn.id = id
    removeTodoBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    removeTodoBtn.onclick = removeTodo;

    const editTodoBtn = document.createElement('button');
    editTodoBtn.classList.add('outline');
    editTodoBtn.innerHTML = '<span class="material-symbols-rounded">edit</span>';
    editTodoBtn.id = id;
    editTodoBtn.onclick = editTodo;

    divBtn.appendChild(removeTodoBtn);
    divBtn.appendChild(editTodoBtn);
    todosContainer.appendChild(todoItem);
}
button.addEventListener('click', function (e) {
    e.preventDefault();
    const exist = verifyExistTodo();
    if (exist) {
        return;
    }

    const todo = { text: text, done: false };
    todoList.push(todo);

    const liText = document.createElement('p');
    const todoItem = document.createElement('li');
    todoItem.id = todoList.at(-1).text;
    liText.id = todoList.at(-1).text;
    liText.textContent = todoList.at(-1).text;

    createBtnDiv(todoItem, liText);
    todoItem.insertBefore(liText, todoItem.children[0]);

    input.value = '';
    input.focus();
});
