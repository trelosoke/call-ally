import express from 'express';
import { randomUUID } from 'node:crypto';

const app = express();
const PORT = 3000;

app.use(express.json());

let callsMock = [
    {
        id: '1',
        title: 'Preciso de ajuda com o login',
        smallDesc: 'Não consigo acessar minha conta',
        fullDesc: 'Quando coloco a senha, aparece erro 404. Já tentei reiniciar o navegador.',
        dueDate: '2026-08-25T10:00:00',
        priority: 'high',
        tags: [{ name: 'Urgente', color: 'red' }]
    }
];

app.get('/calls', (req, res) => {
    res.status(200).json(callsMock)
});

app.post('/calls', (req, res) => {
    const { title, smallDesc, fullDesc, dueDate, priority, tags } = req.body;

    const newCall = {
        id: randomUUID(),
        title,
        smallDesc,
        fullDesc,
        dueDate,
        priority,
        tags
    };

    callsMock.push(newCall);
    res.status(201).json(newCall);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});