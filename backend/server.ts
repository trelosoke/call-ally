import express from 'express';
import type { PrismaClient } from './generated/prisma/client.ts';
import type { Call } from '../src/types/calls.ts';

export function createApp(prisma: PrismaClient) {
    const app = express();
    app.use(express.json());

    app.get('/calls', async (req, res) => {
        const calls = await prisma.call.findMany({orderBy: { createdAt: 'desc' }});
        res.status(200).json(calls.map(call => ({
            ...call,
            tags: call.tags ? JSON.parse(call.tags) : []
        })));
    });

    app.post('/calls', async (req, res) => {
        const { title, smallDesc, fullDesc, dueDate, tags, priority }: Omit<Call, 'id' | 'createdAt'> = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({error: 'Title is required'});
        }

        const createdCall = await prisma.call.create({
            data: {
                title: title.trim(),
                smallDesc: smallDesc,
                fullDesc: fullDesc,
                dueDate: dueDate,
                tags: JSON.stringify(tags),
                priority: priority
            }
        });

        const formattedCall = {
            ...createdCall,
            tags: JSON.parse(createdCall.tags)
        };

        res.status(201).json(formattedCall);
    });

    return app;
}