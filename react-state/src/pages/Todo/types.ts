import { z } from 'zod';

export const todoSchema = z.object({
    text: z.string().min(1, 'Todo text is required').max(200, 'Todo text is too long'),
});

export type TodoFormData = z.infer<typeof todoSchema>;