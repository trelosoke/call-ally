import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { Call } from '../src/types/calls.ts';

const app = express();
const PORT = 3000;
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(express.json());

app.get('/calls', async (req, res) => {
    const calls = await prisma.call.findMany();
    res.status(200).json(calls);
});

app.post('/calls', async (req, res) => {
    const { title, smallDesc, fullDesc, dueDate, tags, priority }: Omit<Call, 'id' | 'createdAt'> = req.body;

    const createdCall = await prisma.call.create({
        data: {
            title: title,
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});