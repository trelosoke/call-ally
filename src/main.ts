import { listCalls, createCall } from './services/calls-service';
import type { Call } from './types/calls';
import './features/form/call-form';
import './features/form/tags/tag-manager';

listCalls().then((calls) => {
    console.log('Loaded calls list:', calls);
});

const newCall: Omit<Call, 'id'>= {
    title: 'Erro no cadastro',
    smallDesc: 'Usuário não consegue confirmar e-mail',
    fullDesc: 'Ao clicar no link de confirmação, retorna erro 500.',
    dueDate: '2026-08-30T09:00:00',
    priority: 'medium',
    tags: [{ name: 'Bug', color: 'yellow' }]
};

createCall(newCall).then((createdCall) => {
    console.log("Call created successfully:", createdCall);

    listCalls().then((calls) => {
        console.log('Loaded calls list:', calls);
    });
});

console.log('This is shown before .then because .then waits 1 second');