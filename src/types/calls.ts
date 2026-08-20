export type Tag = {
    name: string;
    color: string;
};

export type Priority = 'low' | 'medium' | 'high';

export type Call = {
    id: string,
    title: string, 
    smallDesc: string, 
    fullDesc: string, 
    dueDate: string, 
    priority?: Priority,
    tags: Tag[]
};