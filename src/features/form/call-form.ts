// Determina valores aceitáveis para 'prior' na classe de Item de Chamado 
enum Priority {
    I = "I",
    II = "II",
    III = "III"
}

// Cria um objeto de um Item de Chamado
// Os parâmetros informados na instância são os valores de cada entrada no elemento
class CallFormItem {
    //utiliza randomUUID para gerar um identificador exclusivo
    #id: string = crypto.randomUUID();

    constructor(
        public name: string, 
        public smallDesc: string, 
        public fullDesc: string, 
        public dueDay: string, 
        public dueMonth: string, 
        public dueYear: string, 
        public formTime: string,
        public prior: Priority
    ) {}

    get id(): string {
        return this.#id;
    }
    
}

const calls: CallFormItem[] = [];

const callForm = document.getElementById('call-form') as HTMLFormElement;
const formName = callForm.querySelector('#name') as HTMLInputElement;
const smallDesc = callForm.querySelector('#descript') as HTMLInputElement;
const fullDesc = callForm.querySelector('#full-descript') as HTMLTextAreaElement;
const formDueDay = callForm.querySelector('#day') as HTMLInputElement;
const formDueMonth = callForm.querySelector('#month') as HTMLInputElement;
const formDueYear = callForm.querySelector('#year') as HTMLInputElement;
const formTime = callForm.querySelector('#time') as HTMLInputElement;

const saveCall = callForm.querySelector('input[type=submit]') as HTMLInputElement;
const cancelCall = callForm.querySelector('#cancel-call') as HTMLButtonElement;
const newCallButton = document.getElementById('new-call') as HTMLButtonElement;

function openForm(): void {
    saveCall.disabled = false;
    callForm.classList.remove('hidden');
}

function closeForm(): void {
    saveCall.disabled = true;
    callForm.classList.add('hidden');
}

newCallButton.addEventListener('click', (): void => {
    if (callForm.classList.contains('hidden')) {
        openForm();
    } else {
        closeForm();
    }
});

callForm.addEventListener('submit', (e) => {
    //prevent page reload for JS behavior implementation
    e.preventDefault();
    if (callForm.classList.contains('hidden')) {
        return;
    }

    //priority is captured at the moment of submit to ensure the radio is selected
    const formPrior = callForm.querySelector('input[name="prior"]:checked') as HTMLInputElement;
    
    const formInfo = new CallFormItem(
        formName.value, 
        smallDesc.value, 
        fullDesc.value, 
        formDueDay.value, 
        formDueMonth.value, 
        formDueYear.value,
        formTime.value,
        formPrior.value as Priority
    );

    calls.push(formInfo);
    callForm.reset();
    callForm.classList.add('hidden');
});

cancelCall.addEventListener('click', (): void => {
    closeForm();
});