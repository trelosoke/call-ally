// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { createCall, listCalls, handleResponse } from './calls-service';

function createMockResponse(body: BodyInit | null, status?: number, statusText?: string) {
    return new Response(body, { 
        ...(status && { status }), 
        ...(statusText && { statusText })
    });
}

describe('handleResponse', () => {
    describe('when response is successful', () => {
        it('should return OK', async () =>{
            const mockResponse = createMockResponse(JSON.stringify({id: 1, text: 'Test'}), 200);
            const result = await handleResponse(mockResponse);
            
            expect(result).toEqual({id: 1, text: 'Test'});
        });
    });

    describe('when response throw an error', () => {
        const errorCases = [
            { status: 400, statusText: 'Bad Request' },
            { status: 404, statusText: 'Not Found' },
            { status: 500, statusText: 'Internal Server Error' },
        ];

        errorCases.forEach(({status, statusText}) => {
            it(`show throw error when response is ${status}`, async () => {
                const mockResponse = createMockResponse(statusText, status, statusText);

                await expect(
                    async () => await handleResponse(mockResponse)
                )
                .rejects.toThrow(
                    new RegExp(`Request failed \\(${status}\\)`)
                );
            });
        });
    });
});