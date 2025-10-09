import { create } from 'zustand';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export interface TodoState {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}


export const useTodoStore = create<TodoState>((set) => ({
    todos: [],

    addTodo: (text: string) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: crypto.randomUUID(),
                    text,
                    completed: false,
                    createdAt: new Date(),
                },
            ],
        })),

    toggleTodo: (id: string) =>
        set(state => {
            const todos = [...state.todos]
            const index = todos.findIndex(t => t.id === id)
            if (index !== -1) {
                todos[index] = { ...todos[index], completed: !todos[index].completed }
            }
            return { todos }
        }),

    deleteTodo: (id: string) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
}));
