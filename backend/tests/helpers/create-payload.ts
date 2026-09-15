import type { Call } from '../../../src/types/calls';

export function createPayload(overrides: Partial<Omit<Call, 'id' | 'createdAt'>> = {}): Partial<Omit<Call, 'id' | 'createdAt'>> {
    return {
        title: 'Default title',
        smallDesc: 'Default small description',
        fullDesc: 'Default full description',
        dueDate: '2026-01-01T12:00',
        tags: [],
        priority: 'medium',
        ...overrides
    };
}