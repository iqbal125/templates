import axiosBase from './axiosBase';
import type { Todo } from '../types/types';

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axiosBase.get<Todo[]>('/todos?_limit=10');
    return response.data;
};

export const fetchTodoById = async (id: number): Promise<Todo> => {
    const response = await axiosBase.get<Todo>(`/todos/${id}`);
    return response.data;
};
