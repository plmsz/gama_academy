const cepInput = document.querySelector('#cepInput');
const tbody = document.querySelector('#tbody');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#closeModal');
const helperText = document.querySelector('#helperText');
const buttonClearAll = document.querySelector('#clearAll');

const getCep = async () => {
    if (cepInput.value.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepInput.value}/json/`);
            return await response.json();
        } catch (error) {
            modal.setAttribute("open", true);
        }
    } else {
        cepInput.setAttribute('aria-invalid', true);
        helperText.textContent = 'Cep deve conter 8 dígitos';
    }
};

const addRow = () => { };

cepInput.addEventListener('blur', async () => {
    cepInput.removeAttribute('aria-invalid', true);
    helperText.textContent = '';

    const cepTyped = await getCep();

    if (cepTyped?.erro) {
        cepInput.setAttribute('aria-invalid', true);
        helperText.textContent = 'Cep Inválido';
        cepInput.value = '';
        return;
    }
    const isCepInTable = document.getElementById(`${cepTyped.cep}-input`);

    if (isCepInTable) {
        cepInput.setAttribute('aria-invalid', true);
        helperText.textContent = 'Cep já foi adicionado';
        cepInput.value = '';
        return;
    }

    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.id = `${cepTyped.cep}-input`;

    const { gia, ibge, siafi, complemento, ddd, ...address } = cepTyped;

    for (const item in address) {
        const td = document.createElement('td');
        td.textContent = address[item];
        tr.appendChild(td);
    }
    const buttonClear = document.createElement('button');
    buttonClear.textContent = 'Remover';
    buttonClear.classList.add('secondary');
    buttonClear.classList.add('btn-remove');
    buttonClear.id = `${cepTyped.cep}`;
    buttonClear.onclick = function removeTd(e) {
        const inputToBeRemoved = document.getElementById(`${buttonClear.id}-input`);
        inputToBeRemoved.remove();
    };
    tr.appendChild(buttonClear);
    cepInput.value = '';
});

closeModal.addEventListener('click', () => {
    modal.setAttribute("open", false);
});

buttonClearAll.addEventListener('click', () => {
    const allAddresses = document.querySelectorAll('tr');
    allAddresses.forEach(address => address.remove());
});

