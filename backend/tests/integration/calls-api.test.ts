import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { app, clearDatabase, teardownTestDatabase } from '../setup-integration.ts';
import type { Call } from '../../../src/types/calls.ts';

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await teardownTestDatabase();
});

describe('GET /calls', () => {
    it('should return empty array when no calls exist', async () => {
        const response = await request(app).get('/calls');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});

describe('POST /calls', () => {
  describe('success cases', () => {
    it('should create a call and return 201', async () => {
        const payload: Omit<Call, 'id' | 'createdAt'> = {
            title: 'Call test',
            smallDesc: 'This is an API test',
            fullDesc: 'This is really an API test',
            dueDate: '2026-01-01T12:00',
            tags: [{name: 'backend', color: '#ff4073'}],
            priority: 'medium'
        };

        const response = await request(app)
            .post('/calls')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201)
        ;

        expect(response.body.id).toBeDefined();
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.title).toBe(payload.title);
        expect(response.body.fullDesc).toBe(payload.fullDesc);
        expect(response.body.dueDate).toBe(payload.dueDate);
        expect(response.body.tags).toEqual(payload.tags);
        expect(response.body.priority).toBe(payload.priority);
    });
  });
});