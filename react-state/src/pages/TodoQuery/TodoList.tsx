import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Check } from 'lucide-react';
import { todoSchema, type TodoFormData, type Todo } from './types';

// Simulated API functions (in-memory storage for demo)
let todosData: Todo[] = [];

const fetchTodos = async (): Promise<Todo[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...todosData];
};

const addTodoAPI = async (text: string): Promise<Todo> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date(),
    };
    todosData = [...todosData, newTodo];
    return newTodo;
};

const toggleTodoAPI = async (id: string): Promise<Todo> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = todosData.findIndex(t => t.id === id);
    if (index !== -1) {
        todosData[index] = { ...todosData[index], completed: !todosData[index].completed };
        return todosData[index];
    }
    throw new Error('Todo not found');
};

const deleteTodoAPI = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    todosData = todosData.filter(todo => todo.id !== id);
};

export const TodoList: React.FC = () => {
    const queryClient = useQueryClient();

    // Fetch todos
    const { data: todos = [], isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    // Add todo mutation
    const addTodoMutation = useMutation({
        mutationFn: addTodoAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // Toggle todo mutation
    const toggleTodoMutation = useMutation({
        mutationFn: toggleTodoAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // Delete todo mutation
    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodoAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
    });

    const onSubmit = (data: TodoFormData) => {
        addTodoMutation.mutate(data.text.trim());
        reset();
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-center">Todo List (React Query)</h1>
                <Card className="p-6 text-center text-gray-500">
                    Loading...
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-center">Todo List (React Query)</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            {...register('text')}
                            type="text"
                            placeholder="Add a new todo..."
                            className="flex-1"
                        />
                        {errors.text && (
                            <p className="text-sm text-red-500 mt-1">{errors.text.message}</p>
                        )}
                    </div>
                    <Button type="submit" disabled={addTodoMutation.isPending}>
                        {addTodoMutation.isPending ? 'Adding...' : 'Add'}
                    </Button>
                </div>
            </form>

            <div className="space-y-2">
                {todos.length === 0 ? (
                    <Card className="p-6 text-center text-gray-500">
                        No todos yet. Add one above!
                    </Card>
                ) : (
                    todos.map((todo) => (
                        <Card
                            key={todo.id}
                            className={`p-4 flex items-center justify-between transition-all ${todo.completed ? 'bg-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <button
                                    onClick={() => toggleTodoMutation.mutate(todo.id)}
                                    disabled={toggleTodoMutation.isPending}
                                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${todo.completed
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-gray-300 hover:border-green-500'
                                        }`}
                                >
                                    {todo.completed && <Check className="w-4 h-4 text-white" />}
                                </button>
                                <span
                                    className={`text-lg ${todo.completed
                                        ? 'line-through text-gray-500'
                                        : 'text-gray-900'
                                        }`}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deleteTodoMutation.mutate(todo.id)}
                                disabled={deleteTodoMutation.isPending}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </Card>
                    ))
                )}
            </div>

            {todos.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                    {todos.filter((t) => !t.completed).length} of {todos.length} tasks
                    remaining
                </div>
            )}
        </div>
    );
};
