const display = document.querySelector('.calc-operation');
const answer = document.querySelector('.calc-typed');
const buttons = document.querySelectorAll('.button');


buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id === 'CE') {
            clearAll();
            return;
        }
        if (e.target.id === 'C') {
            clear();
            return;
        }
        if (e.target.id === 'back') {
            goBack();
            return;
        }
        showTypedButton(e.target.id);
    });
});

function showTypedButton(typed) {
    const operation = document.createElement('span');
    operation.textContent = typed;
    display.appendChild(operation);
}
function clearAll() {
    display.textContent = null;
}

function clear() {
    console.log('limpar');
}
function goBack() {
    console.log('voltar');
}