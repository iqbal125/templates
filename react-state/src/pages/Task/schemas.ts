import { z } from 'zod';

// Project Schema Factory - creates schema with uniqueness validation
export const createProjectSchema = (existingProjectNames: string[]) => {
    return z.object({
        name: z.string()
            .min(1, 'Project name is required')
            .min(3, 'Project name must be at least 3 characters')
            .max(100, 'Project name must be less than 100 characters')
            .refine(
                (name) => !existingProjectNames.some(
                    (existingName) => existingName.toLowerCase() === name.toLowerCase()
                ),
                {
                    message: 'A project with this name already exists',
                }
            ),
    });
};

// Base project schema without uniqueness check (for type inference)
export const projectSchema = z.object({
    name: z.string()
        .min(1, 'Project name is required')
        .min(3, 'Project name must be at least 3 characters')
        .max(100, 'Project name must be less than 100 characters'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Task Schema
export const taskSchema = z.object({
    title: z.string()
        .min(1, 'Task title is required')
        .min(3, 'Task title must be at least 3 characters')
        .max(200, 'Task title must be less than 200 characters'),
    description: z.string()
        .min(1, 'Task description is required')
        .min(10, 'Task description must be at least 10 characters')
        .max(1000, 'Task description must be less than 1000 characters'),
});

export type TaskFormData = z.infer<typeof taskSchema>;

// Comment Schema
export const commentSchema = z.object({
    text: z.string()
        .min(1, 'Comment cannot be empty')
        .min(2, 'Comment must be at least 2 characters')
        .max(500, 'Comment must be less than 500 characters'),
});

export type CommentFormData = z.infer<typeof commentSchema>;
