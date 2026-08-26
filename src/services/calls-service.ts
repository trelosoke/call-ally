import type { Call } from '../types/calls';

export function listCalls() {
    return fetch('/api/calls')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        });
}

export function createCall(newCallData: Omit<Call, 'id'>) {
    return fetch('/api/calls', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newCallData),
    })
    .then(response => response.json())
    .then(calls => {
        console.log(calls);
        return calls;
    });
}