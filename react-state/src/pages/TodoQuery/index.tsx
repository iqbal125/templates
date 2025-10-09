import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoList } from '@/pages/TodoQuery/TodoList';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const TodoQuery: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <TodoList />
            </div>
        </QueryClientProvider>
    );
};

export default TodoQuery;
