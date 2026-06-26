const callForm = document.getElementById('call-form');
const formName = callForm.querySelector('#name');
const smallDesc = callForm.querySelector('#descript');
const fullDesc = callForm.querySelector('#full-descript');
const formDueDay = callForm.querySelector('#day');
const formDueMonth = callForm.querySelector('#month');
const formDueYear = callForm.querySelector('#year');

// Construtor que cria um objeto de um Item de Chamado
// Os parâmetros informados são os valores de cada entrada no elemento
function FormCallItem(name, smallDesc, fullDesc, dueDay, dueMonth, dueYear) {
    //utiliza randomUUID para gerar um identificador exclusivo
    this.id = crypto.randomUUID();
    
    this.name = name;
    this.smallDesc = smallDesc;
    this.fullDesc = fullDesc;
    this.dueDay = dueDay;
    this.dueMonth = dueMonth;
    this.dueYear = dueYear;
}

const newCallButton = document.getElementById('new-call');

function openForm() {
    callForm.classList.remove('hidden');
}

function closeForm() {
    callForm.classList.add('hidden');
}

newCallButton.addEventListener('click', () => {
    if (callForm.classList.contains('hidden')) {
        openForm();
    } else {
        closeForm();
    }
});