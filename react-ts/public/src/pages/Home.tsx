import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import TodoContainer from '../components/TodoContainer';
import { fetchTodos } from '../api/todos';
import type { Todo } from '../types/types';

const Home: React.FC = () => {
    const {
        data: todos,
        isLoading,
        error,
        isError
    } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const [localTodos, setLocalTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (todos) {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                try {
                    const parsed = JSON.parse(savedTodos);
                    const mergedTodos = todos.map(todo => {
                        const saved = parsed.find((s: Todo) => s.id === todo.id);
                        return saved ? { ...todo, completed: saved.completed } : todo;
                    });
                    setLocalTodos(mergedTodos);
                } catch {
                    setLocalTodos(todos);
                }
            } else {
                setLocalTodos(todos);
            }
        }
    }, [todos]);

    useEffect(() => {
        if (localTodos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(localTodos));
        }
    }, [localTodos]);

    const handleToggleTodo = (id: number) => {
        setLocalTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-xl mx-auto p-6 space-y-6">
                <Hero />
                <TodoContainer
                    todos={localTodos}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    onToggleTodo={handleToggleTodo}
                />
            </div>
        </div>
    );
};

export default Home;