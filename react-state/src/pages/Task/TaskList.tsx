import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from './store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TaskItem } from './TaskItem';
import { taskSchema, type TaskFormData } from './schemas';

interface TaskListProps {
    projectId: string;
}

export function TaskList({ projectId }: TaskListProps) {
    const projects = useAppStore((state) => state.projects);
    const addTask = useAppStore((state) => state.addTask);

    const [showAddForm, setShowAddForm] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
    });

    const project = projects.find((p) => p.id === projectId);

    const onSubmit = (data: TaskFormData) => {
        addTask(projectId, data.title, data.description);
        reset();
        setShowAddForm(false);
    };

    if (!project) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Tasks</h4>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : '+ Add Task'}
                </Button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4 border rounded-lg">
                    <div>
                        <Input
                            type="text"
                            placeholder="Task title..."
                            {...register('title')}
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Task description..."
                            {...register('description')}
                            className={errors.description ? 'border-red-500' : ''}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>
                    <Button type="submit" size="sm">
                        Add Task
                    </Button>
                </form>
            )}

            <div className="space-y-3">
                {project.tasks.length === 0 ? (
                    <p className="text-gray-500 text-sm">No tasks yet. Add your first task!</p>
                ) : (
                    project.tasks.map((task) => (
                        <TaskItem key={task.id} task={task} projectId={projectId} />
                    ))
                )}
            </div>
        </div>
    );
}
