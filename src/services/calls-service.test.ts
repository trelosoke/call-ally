import { test, describe } from 'node:test';
import assert from 'node:assert';
import { createCall, listCalls, handleResponse } from './calls-service';

describe('handleResponse', () => {
    test('should return OK', async () =>{
        const mockResponse = new Response(
            JSON.stringify({id: 1, text: 'Test'}),
            { status: 200 }
        );

        const result = await handleResponse(mockResponse);
        
        assert.deepStrictEqual(result, {id: 1, text: 'Test'});
    });
});