import type { Call } from '../types/calls';

let callsMock: Call[] = [
    {
        id: '1',
        title: 'Preciso de ajuda com o login',
        smallDesc: 'Não consigo acessar minha conta',
        fullDesc: 'Quando coloco a senha, aparece erro 404. Já tentei reiniciar o navegador.',
        dueDate: '2026-08-25T10:00:00',
        priority: 'high',
        tags: [{ name: 'Urgente', color: 'red' }]
    }
];

export function listCalls() {
    return new Promise<Call[]>((resolve) => {
        setTimeout(() => {
            resolve(callsMock);
        }, 1000);
    });
}

export function createCall(newCallData: Omit<Call, 'id'>) {
    return new Promise<Call>((resolve) => {
        const newId = crypto.randomUUID();

        const newCall: Call = {
            ...newCallData,
            id: newId
        };

        setTimeout(() => {
            callsMock.push(newCall);
            resolve(newCall);
        }, 500);
    })
}