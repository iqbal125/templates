import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoStore } from '@/pages/Todo/todoStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, Check } from 'lucide-react';
import { todoSchema, type TodoFormData } from './types';

export const TodoList: React.FC = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
    });

    const onSubmit = (data: TodoFormData) => {
        addTodo(data.text.trim());
        reset();
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-center">Todo List</h1>

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
                    <Button type="submit">Add</Button>
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
                                    onClick={() => toggleTodo(todo.id)}
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
                                onClick={() => deleteTodo(todo.id)}
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
