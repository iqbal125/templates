import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import TodoList from './TodoList';
import type { Todo } from '@/types/types';

interface TodoContainerProps {
    todos: Todo[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    onToggleTodo: (id: number) => void;
}

const TodoContainer: React.FC<TodoContainerProps> = ({
    todos,
    isLoading,
    isError,
    error,
    onToggleTodo
}) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Todos</h2>
                <span className="text-sm text-gray-500">
                    {todos?.length || 0} tasks
                </span>
            </div>

            {isLoading && <LoadingSpinner message="Loading todos..." />}
            {isError && <ErrorMessage error={error} message="Error loading todos" />}
            {!isLoading && !isError && (
                <TodoList todos={todos} onToggleTodo={onToggleTodo} />
            )}
        </div>
    );
};

export default TodoContainer;
