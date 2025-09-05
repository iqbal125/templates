import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '@/types/types';

interface TodoListProps {
    todos: Todo[];
    onToggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo }) => {
    if (!todos || todos.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No todos found. Start by adding a new task!
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggleTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
