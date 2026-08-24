import { useEffect, useState } from "react";
import { createCall } from '../services/calls-service';
import type { Call, Priority, Tag } from '../types/calls';

type CallFormProps = {
    onCallCreated: () => void
}

function CallForm({ onCallCreated }: CallFormProps) {
    const [title, setTitle] = useState('');
    const [smallDesc, setSmallDesc] = useState('');
    const [fullDesc, setFullDesc] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Priority | undefined>(undefined);
    const [tags, setTags] = useState<Tag[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [tagColor, setTagColor] = useState('#ff4073');

    useEffect(() => {
        console.log('Updated tags:', tags);
    }, [tags]);

    useEffect(() => {
        console.log('Updated tags:', tags);
    }, []);

    function handleAddTag(): void {
        if (tagInput.trim() === '') return;

        const newTag: Tag = {
            name: tagInput,
            color: tagColor
        }

        setTags([...tags, newTag]);
        setTagInput('');
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData: Omit<Call, 'id'> = {
            title: title,
            smallDesc: smallDesc,
            fullDesc: fullDesc,
            dueDate: dueDate,
            tags: tags,
            ...(priority !== undefined && { priority })
        }

        createCall(formData).then(() => {
            setTitle('');
            setSmallDesc('');
            setFullDesc('');
            setDueDate('');
            setPriority(undefined);
            setTags([]);

            onCallCreated();
            console.log('Call successfully created');
        });
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input type="text" placeholder="Descrição curta" 
                value={smallDesc}
                onChange={e => setSmallDesc(e.target.value)}
            />
            <textarea placeholder="Descrição longa"
                value={fullDesc}
                onChange={e => setFullDesc(e.target.value)}
            />
            {/* TODO: Add default value (e.g., today + 7 days) and handle timezone normalization (client local -> UTC). */}
            <input type="datetime-local"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />
            <label htmlFor="priority-select">Prioridade</label>
            <select name="priority" id="priority-select"
                value={priority || ''}
                onChange={e => {
                    const value = e.target.value;
                    setPriority(value === '' ? undefined : (value as Priority))
                }}
            >
                <option value="">Nenhuma</option>
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
            </select>

            <input type="text" placeholder="Tag" 
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
            />
            <input type="color" 
                value={tagColor}
                onChange={e => setTagColor(e.target.value)}
            />
            <button type="button" onClick={handleAddTag}>Adicionar tag</button>

            <button type="submit">Criar Chamado</button>
        </form>
    );
}

export default CallForm;