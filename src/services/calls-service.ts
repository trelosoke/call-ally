import type { Call } from '../types/calls';

async function handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Request failed (${response.status}): ${text || response.statusText}`);
    }
    return response.json();
}

export function listCalls(): Promise<Call[]> {
    return fetch('/api/calls')
        .then(handleResponse)
        .then((data) => {
            console.log('Loaded calls:', data);
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
        .then(handleResponse)
        .then((createdCall) => {
            console.log('Call created:', createdCall);
            return createdCall;
        });
}
