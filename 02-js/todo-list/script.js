const button = document.getElementById('add');
const input = document.getElementById('input');
const todosContainer = document.getElementById('todosContainer');
const select = document.getElementById('filter');
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
    const type = select.value;

    if (type === 'done') {
        filter('done');
    } else if (type === 'to-do') {
        filter('to-do');
    } else {
        filter('all');
    }
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

        const date = new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date());
        const liDate = document.createElement('span');
        liDate.classList.add('subtitle');
        liDate.textContent = `editado em ${date}`;
        newLiText.appendChild(liDate);

        const btnDiv = document.getElementById(`${id}-div`);
        btnDiv.remove();
        createBtnDiv(li, newLiText);
        li.insertBefore(newLiText, li.children[0]);
        inputEdit.remove();

        const newList = todoList.map(todo => {
            if (todo.text === id) {
                return { ...todo, text: newText, date, edited: true };
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
    const id = liText.id;
    const divBtn = document.createElement('div');
    divBtn.id = `${id}-div`;
    todoItem.appendChild(divBtn);

    const removeTodoBtn = document.createElement('button');
    removeTodoBtn.classList.add('outline');
    removeTodoBtn.id = id;
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
function createItem(todo) {
    const { text, done, date, edited } = todo;

    const liText = document.createElement('p');
    const liDate = document.createElement('span');
    done ? liText.classList.add('done') : null;
    liDate.classList.add('subtitle');
    const todoItem = document.createElement('li');

    liDate.textContent = todo.edited ? `edited in ${date}` : `created at ${date}`;
    todoItem.id = text;
    liText.id = text;
    liText.textContent = text;

    createBtnDiv(todoItem, liText);
    todoItem.insertBefore(liText, todoItem.children[0]);
    liText.appendChild(liDate);

}
button.addEventListener('click', function (e) {
    e.preventDefault();
    const exist = verifyExistTodo();
    if (exist) {
        return;
    }
    const date = new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date());

    const todo = { text: text, done: false, date, edited: false };

    createItem(todo);
    todoList.push(todo);

    input.value = '';
    input.focus();
});


function filter(type) {
    todosContainer.innerHTML = '';
    let newList = [...todoList];

    if (type === 'done') {
        newList = todoList.filter(item => item.done);
    }
    if (type === 'to-do') {
        newList = todoList.filter(item => !item.done);
    }

    newList.forEach(item => createItem(item));
}

select.addEventListener('change', function (e) {
    const type = e.target.value;
    filter(type);
});
