import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from './store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TaskList } from './TaskList';
import { createProjectSchema, type ProjectFormData } from './schemas';

export function ProjectList() {
    const projects = useAppStore((state) => state.projects);
    const addProject = useAppStore((state) => state.addProject);

    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    // Create schema with existing project names for uniqueness validation
    const projectSchema = useMemo(
        () => createProjectSchema(projects.map((p) => p.name)),
        [projects]
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const onSubmit = (data: ProjectFormData) => {
        addProject(data.name);
        reset();
    };

    return (
        <div className="space-y-6">
            {/* Add Project Form */}
            <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Projects</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <Input
                            type="text"
                            placeholder="Enter project name..."
                            {...register('name')}
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    <Button type="submit">Add Project</Button>
                </form>
            </Card>

            {/* Projects List */}
            {projects.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-gray-500">No projects yet. Create your first project!</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <Card key={project.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span>Owner: {project.owner}</span>
                                        <span className="capitalize">
                                            {project.settings.visibility}
                                        </span>
                                        {project.settings.tags.length > 0 && (
                                            <span>Tags: {project.settings.tags.join(', ')}</span>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    variant={selectedProjectId === project.id ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() =>
                                        setSelectedProjectId(
                                            selectedProjectId === project.id ? null : project.id
                                        )
                                    }
                                >
                                    {selectedProjectId === project.id ? 'Hide Tasks' : 'Show Tasks'}
                                </Button>
                            </div>

                            <div className="text-sm text-gray-600 mb-2">
                                Tasks: {project.tasks.length} ({project.tasks.filter((t) => t.completed).length}{' '}
                                completed)
                            </div>

                            {selectedProjectId === project.id && (
                                <div className="mt-4 pt-4 border-t">
                                    <TaskList projectId={project.id} />
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
