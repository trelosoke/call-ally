import { tags, TagData, toggleTagMenu } from './tags/tag-manager';

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
    #creationDate = this.#formatCreationDate();
    #creationTime = this.#formatCreationTime();

    constructor(
        public name: string, 
        public smallDesc: string, 
        public fullDesc: string, 
        public dueDay: string, 
        public dueMonth: string, 
        public dueYear: string, 
        public formTime: string,
        public prior: Priority,
        public tags: TagData[]
    ) {}

    #formatCreationDate() {
        const date = new Date();
        const months: string[] = [
            'jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.',
            'jul.', 'ago.', 'set.', 'out.', 'nov', 'dez.'
        ];

        const day = String(date.getDate()).padStart(2, '0');
        const month = date.getMonth();
        const year = String(date.getFullYear());

        return `${day} de ${months[month]} de ${year}`;
    }

    #formatCreationTime() {
        const time = new Date();

        const hour = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');

        return `${hour}:${minutes}`;
    }

    get id(): string {
        return this.#id;
    }

    get creationDate(): string {
        return this.#creationDate;
    }

    get creationTime(): string {
        return this.#creationTime;
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

// Retorna a função caso o elemento de No Tag Warning esteja visível
// Caso contrário, mostra o elemento e o esconde após 6 segundos
function noTagWarning(): void {
    const warning = document.querySelector('#no-tag-warning') as HTMLDivElement;
    if (!warning.classList.contains('hidden')) {
        return;
    }

    warning.classList.remove('hidden');
    setTimeout(() => {
        warning.classList.add('hidden');
    },6000);
}

function validatePriority(value: string): Priority {
    if (Object.values(Priority).includes(value as Priority)) {
        return value as Priority; 
    }

    console.warn(`Invalid priority value received: "${value}". Falling back to Priority.I`);
    return Priority.I;
}

callForm.addEventListener('submit', (e): void => {
    // Previne o recarregamento da página para a implementação do comportamento do JS
    e.preventDefault();
    if (callForm.classList.contains('hidden')) {
        return;
    }

    if (tags.length === 0){
        noTagWarning();
        return;
    };

    // O formPrior é capiturado no momento de submit para garantir que o input radio está selecionado
    const formPrior = callForm.querySelector('input[name="prior"]:checked') as HTMLInputElement;
    
    const formInfo = new CallFormItem(
        formName.value, 
        smallDesc.value, 
        fullDesc.value, 
        formDueDay.value, 
        formDueMonth.value, 
        formDueYear.value,
        formTime.value,
        validatePriority(formPrior.value),
        Array.from(tags)
    );

    calls.push(formInfo);

    if (import.meta.env.DEV) {
        (window as any).__debug = { calls, formInfo, tags };
    }

    callForm.reset();
    tags.length = 0;
    toggleTagMenu();
    closeForm();
});

cancelCall.addEventListener('click', (): void => {
    closeForm();
});