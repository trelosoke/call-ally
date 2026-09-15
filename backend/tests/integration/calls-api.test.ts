import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { app, prisma, clearDatabase, teardownTestDatabase } from '../setup-integration.ts';
import { createPayload } from '../helpers/create-payload.ts';
import { createCall } from '../helpers/create-call.ts';

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await teardownTestDatabase();
});

const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('GET /calls', () => {
    describe('success cases', () => {
        it ('should return all calls when they exist', async () => {
            const payload1 = createPayload({ title: 'First call' });
            const payload2 = createPayload({ title: 'Second call' });

            await createCall(payload1).expect(201);
            await createCall(payload2).expect(201);

            const response = await request(app).get('/calls');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);

            expect(response.body[0].id).toBeDefined();
            expect(response.body[0].id).toMatch(idPattern);
            expect(response.body[0].createdAt).toBeDefined();
            expect(new Date(response.body[0].createdAt).getTime()).not.toBeNaN();

            expect(response.body[0].title).toBe(payload2.title);
            expect(response.body[0].fullDesc).toBe(payload2.fullDesc);
            expect(response.body[0].smallDesc).toBe(payload2.smallDesc);
            expect(response.body[0].dueDate).toBe(payload2.dueDate);
            expect(response.body[0].tags).toEqual(payload2.tags);
            expect(response.body[0].priority).toBe(payload2.priority);
        });

        it('should return empty array when no calls exist', async () => {
            const response = await request(app).get('/calls');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should return calls sorted by createdAt desc', async () => {
            await createCall(createPayload({ title: 'First' }));
            await createCall(createPayload({ title: 'Second' }));
            await createCall(createPayload({ title: 'Third' }));

            const response = await request(app).get('/calls');

            expect(response.body[0].title).toBe('Third');
            expect(response.body[1].title).toBe('Second');
            expect(response.body[2].title).toBe('First');
        });

        it('should return null priority in the list when call was created without it', async () => {
            const payload = createPayload({ priority: undefined });
            await createCall(payload).expect(201);

            const response = await request(app).get('/calls');
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0].priority).toBeNull();
        });
    });

    describe('failure cases', () => {
        it('should return 404 for a non-existent route', async () => {
            const response = await request(app).get('/call');

            expect(response.status).toBe(404);
        });
    });
});

describe('POST /calls', () => {
    describe('success cases', () => {
        it('should create a call and return 201', async () => {
            const payload = createPayload();

            const response = await createCall(payload)
                .expect('Content-Type', /json/)
                .expect(201)
            ;

            expect(response.body.id).toBeDefined();
            expect(response.body.id).toMatch(idPattern);
            expect(response.body.createdAt).toBeDefined();
            expect(new Date(response.body.createdAt).getTime()).not.toBeNaN();

            expect(response.body.title).toBe(payload.title);
            expect(response.body.fullDesc).toBe(payload.fullDesc);
            expect(response.body.smallDesc).toBe(payload.smallDesc);
            expect(response.body.dueDate).toBe(payload.dueDate);
            expect(response.body.tags).toEqual(payload.tags);
            expect(response.body.priority).toBe(payload.priority);
        });

        it('should create a call with trimmed title and return 201', async () => {
            const payload = createPayload({ title: ' Title not trimmed ' });

            const response = await createCall(payload)
                .expect('Content-Type', /json/)
                .expect(201)
            ;

            expect(response.body.title).toBe('Title not trimmed');
        });

        it('should return tags as an array and code 201', async () => {
            const payload = createPayload();

            const response = await createCall(payload)
                .expect('Content-Type', /json/)
                .expect(201)
            ;

            expect(Array.isArray(response.body.tags)).toBe(true);
            expect(response.body.tags).toEqual(payload.tags);
        });

        it('should default priority to null if not provided', async () => {
            const payload = createPayload({ priority: undefined });

            const response = await createCall(payload)
                .expect('Content-Type', /json/)
                .expect(201)
            ;

            expect(response.body.priority).toBeNull();
        });

        it('should persist the call in the database', async () => {
            const payload = createPayload();

            const response = await createCall(payload)
                .expect('Content-Type', /json/)
                .expect(201)
            ;

            const databaseCall = await prisma.call.findUnique({where: {id: response.body.id}});

            expect(databaseCall).not.toBeNull();

            expect(databaseCall?.id).toBe(response.body.id);
            expect(databaseCall?.createdAt.toISOString()).toBe(response.body.createdAt);

            expect(databaseCall?.title).toEqual(payload.title);
            expect(databaseCall?.dueDate).toEqual(payload.dueDate);
            expect(databaseCall?.tags).toEqual(JSON.stringify(payload.tags));
            expect(databaseCall?.priority).toEqual(payload.priority);
        });
    });

    describe('validation errors', () => {
        it.each([
            { case: 'missing', title: undefined },
            { case: 'empty', title: '' },
            { case: 'only whitespace', title: '   '}
        ])('should return 400 when title is $case', async ({ title }) => {
            const payload = createPayload({ title: title });

            const response = await createCall(payload).expect(400);

            expect(response.body.error).toBeDefined();
        });

        it('should return 400 when body is not valid JSON', async () => {
            const response = await request(app)
                .post('/calls')
                .set('Content-Type', 'application/json')
                .send('not a json')

            expect(response.status).toBe(400)
        });
    });
});