import { test, describe, mock } from 'node:test';
import assert from 'node:assert';
import { createCall, listCalls, handleResponse } from './calls-service';

function createMockResponse(body: BodyInit | null, status?: number, statusText?: string) {
    return new Response(body, { 
        ...(status && { status }), 
        ...(statusText && { statusText })
    });
}

describe('handleResponse', () => {
    test('should return OK', async () =>{
        const mockResponse = createMockResponse(JSON.stringify({id: 1, text: 'Test'}), 200);

        const result = await handleResponse(mockResponse);
        
        assert.deepStrictEqual(result, {id: 1, text: 'Test'});
    });

    const errorCases = [
        { status: 400, statusText: 'Bad Request' },
        { status: 404, statusText: 'Not Found' },
        { status: 500, statusText: 'Internal Server Error' },
    ];

    errorCases.forEach(({status, statusText}) => {
        test(`show return error when response is ${status}`, async () => {
            const mockResponse = createMockResponse(statusText, status, statusText);

            await assert.rejects(
                async () => await handleResponse(mockResponse),
                new RegExp(`Request failed \\(${status}\\)`)
            );
        });
    });
});