const newListInput = document.getElementById('[data-new-list-input]');
const listContainer = document.getElementById('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');

let lists = [];

function render() {
    clearElement(listContainer);
    lists.forEach(function (list) {
        const item = document.createElement('li');
        item.classList.add('item');
        item.innerText = list;
        listContainer.appendChild(item);
    });
}

function createList(name) {
    return { id: Date.now().toString(), name: name };
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

newListForm.addEventListener('submit', function (e) => {
    e.preventDefault()
    const listName = newListInput.value
    if(listName === null || listName === '') return;
    const list = createList(listName);
    newListInput.value = null
    lists.push(list);
    render()
})

