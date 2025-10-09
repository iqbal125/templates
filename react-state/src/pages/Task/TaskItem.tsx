import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from './store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { commentSchema, type CommentFormData } from './schemas';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    comments: {
        id: string;
        text: string;
        author: string;
    }[];
}

interface TaskItemProps {
    task: Task;
    projectId: string;
}

export function TaskItem({ task, projectId }: TaskItemProps) {
    const user = useAppStore((state) => state.user);
    const toggleTask = useAppStore((state) => state.toggleTask);
    const addComment = useAppStore((state) => state.addComment);

    const [showComments, setShowComments] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
    });

    const handleToggleTask = () => {
        toggleTask(projectId, task.id);
    };

    const onSubmit = (data: CommentFormData) => {
        if (user) {
            addComment(projectId, task.id, data.text, user.name);
            reset();
        }
    };

    return (
        <Card className="p-4">
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggleTask}
                    className="mt-1 h-5 w-5 cursor-pointer"
                />
                <div className="flex-1">
                    <h5
                        className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''
                            }`}
                    >
                        {task.title}
                    </h5>
                    <p
                        className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'
                            }`}
                    >
                        {task.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                        >
                            💬 {task.comments.length} Comments
                        </Button>
                    </div>

                    {showComments && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2">
                            {/* Comments List */}
                            {task.comments.length > 0 && (
                                <div className="space-y-2">
                                    {task.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="bg-gray-50 dark:bg-gray-800 p-3 rounded"
                                        >
                                            <p className="text-sm font-medium">{comment.author}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                {comment.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Comment Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Add a comment..."
                                    {...register('text')}
                                    className={errors.text ? 'border-red-500 flex-1' : 'flex-1'}
                                />
                                <Button type="submit" size="sm">
                                    Post
                                </Button>
                            </form>
                            {errors.text && (
                                <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
