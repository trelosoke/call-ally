const calls = [];

const callForm = document.getElementById('call-form');
const formName = callForm.querySelector('#name');
const smallDesc = callForm.querySelector('#descript');
const fullDesc = callForm.querySelector('#full-descript');
const formDueDay = callForm.querySelector('#day');
const formDueMonth = callForm.querySelector('#month');
const formDueYear = callForm.querySelector('#year');
const formTime = callForm.querySelector('#time');

// Construtor que cria um objeto de um Item de Chamado
// Os parâmetros informados são os valores de cada entrada no elemento
function FormCallItem(name, smallDesc, fullDesc, dueDay, dueMonth, dueYear, time) {
    //utiliza randomUUID para gerar um identificador exclusivo
    this.id = crypto.randomUUID();
    
    this.name = name;
    this.smallDesc = smallDesc;
    this.fullDesc = fullDesc;
    this.dueDay = dueDay;
    this.dueMonth = dueMonth;
    this.dueYear = dueYear;
    this.formTime = time;
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

const saveCall = callForm.querySelector('input[type=submit]');

callForm.addEventListener('submit', (e) => {
    //prevent page reload for JS behavior implementation
    e.preventDefault();

    //priority is captured at the moment of submit to ensure the radio is selected
    const formPrior = callForm.querySelector('input[name="prior"]:checked');
    
    const formInfo = new FormCallItem(
        formName.value, 
        smallDesc.value, 
        fullDesc.value, 
        formDueDay.value, 
        formDueMonth.value, 
        formDueYear.value,
        formTime.value
    );

    formInfo.prior = formPrior.value;

    calls.push(formInfo);
    callForm.reset();
    callForm.classList.add('hidden');
});