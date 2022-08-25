const cepInput = document.querySelector('#cepInput');
const tbody = document.querySelector('#tbody');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#closeModal');
//botão excluir um cep
//botão excluir lista de cep

const getCep = async () => {
    if (cepInput.value.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepInput.value}/json/`);
            return await response.json();
        } catch (error) {
            modal.setAttribute("open", true);
        }
    } else {
        alert('cep deve ter 8 digitos');
    }
};

const addRow = () => { };

cepInput.addEventListener('blur', async () => {
    const cepTyped = await getCep();

    if (cepTyped?.erro) {
        alert('cep inválido');
        return;
    }
    const isCepInTable = document.getElementById(cepTyped.cep);

    if (isCepInTable) {
        alert('cep já foi adicionado');
        return;
    }

    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.id = cepTyped.cep;

    const { gia, ibge, siafi, complemento, ddd, ...address } = cepTyped;

    for (const item in address) {
        const td = document.createElement('td');
        td.textContent = address[item];
        tr.appendChild(td);
    }
});

closeModal.addEventListener('click', () => {
    modal.setAttribute("open", false);
});