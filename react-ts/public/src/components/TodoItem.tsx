import React from 'react';
import type { Todo } from '@/types/types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
    return (
        <div
            className={`p-3 rounded-lg border transition-colors ${todo.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
                }`}
        >
            <div className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="h-4 w-4 text-blue-600 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
                    aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                />
                <span
                    className={`flex-1 ${todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                        }`}
                >
                    {todo.title}
                </span>
                <span className="text-sm text-gray-400">
                    #{todo.id}
                </span>
            </div>
        </div>
    );
};

export default TodoItem;
