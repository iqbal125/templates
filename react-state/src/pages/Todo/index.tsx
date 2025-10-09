import React from 'react';

import { TodoList } from '@/pages/Todo/TodoList';


const Todo: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <TodoList />
        </div>
    );
};

export default Todo;
