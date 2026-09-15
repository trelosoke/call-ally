import request from 'supertest';
import { app } from '../setup-integration.ts';
import type { Call } from '../../../src/types/calls';

export function createCall(payload: Partial<Omit<Call, 'id' | 'createdAt'>>) {
    return request(app).post('/calls').send(payload);
}