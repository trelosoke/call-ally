import { describe, it, expect, vi } from 'vitest';
import { createCall, listCalls, handleResponse } from './calls-service';
import type { Call } from '../types/calls';

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

describe('createCall', () => {
    describe('when call is successfully created', () => {
        it('should return the created call when API succeeds', async () => {
            const mockFetch = vi.spyOn(global, 'fetch');

            const call: Omit<Call, 'id' | 'createdAt'> = {
                title: 'Test',
                smallDesc: 'This is a test',
                fullDesc: 'This call show be return as a value',
                dueDate: '2020-12-12T12:00',
                tags: [{ name: 'My Tag', color: '#ff4073' }],
                priority: 'high'
            };

            const expectedResponse: Call = {
                id: '123',
                title: 'Test',
                smallDesc: 'This is a test',
                fullDesc: 'This call show be return as a value',
                dueDate: '2020-12-12T12:00',
                tags: [{ name: 'My Tag', color: '#ff4073' }],
                priority: 'high',
                createdAt: '2026-09-02T14:30:00.000Z'
            }

            mockFetch.mockResolvedValue(
                new Response(
                    JSON.stringify(expectedResponse),
                    { status: 201, statusText: 'Created' }
                )
            );

            const result = await createCall(call);

            expect(result).toEqual(expectedResponse);

            mockFetch.mockRestore();
        });
    });
});