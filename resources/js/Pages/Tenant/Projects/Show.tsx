import TenantLayout from '@/Layouts/TenantLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps, Project, Task } from '@/types';

interface ProjectShowProps extends PageProps {
    project: Project & {
        tasks?: Task[];
    };
}

export default function ProjectShow({ auth, project }: ProjectShowProps) {
    const { data, setData, post, delete: destroy } = useForm({
        title: '',
        status: 'todo',
        priority: 1,
    });

    const todoTasks = project.tasks?.filter(t => t.status === 'todo') || [];
    const inProgressTasks = project.tasks?.filter(t => t.status === 'in_progress') || [];
    const doneTasks = project.tasks?.filter(t => t.status === 'done') || [];

    const handleTaskSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/tasks?project_id=${project.id}`, {
            onSuccess: () => setData({ title: '', status: 'todo', priority: 1 }),
        });
    };

    const isAdmin = ['super_admin', 'admin'].includes(auth.user.role);

    return (
        <TenantLayout auth={auth}>
            <Head title={project.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <Link href="/projects" className="text-gray-500 hover:text-gray-700">
                            ← Back
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {project.name}
                        </h1>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {project.description || 'No description'}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`px-3 py-1 rounded-full ${
                                project.status === 'active' ? 'bg-green-100 text-green-800' :
                                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {project.status}
                            </span>
                            <span>Due: {project.due_date || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TaskColumn title="To Do" tasks={todoTasks} color="gray" projectId={project.id} />
                        <TaskColumn title="In Progress" tasks={inProgressTasks} color="blue" projectId={project.id} />
                        <TaskColumn title="Done" tasks={doneTasks} color="green" projectId={project.id} />
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}

function TaskColumn({ title, tasks, color, projectId }: { 
    title: string; 
    tasks: Task[]; 
    color: string; 
    projectId: number;
}) {
    const { data, setData, post } = useForm({ title: '', status: 'todo', priority: 1 });
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/tasks?project_id=${projectId}`, {
            onSuccess: () => {
                setData({ title: '', status: 'todo', priority: 1 });
                setShowForm(false);
            },
        });
    };

    const colorClasses = {
        gray: 'border-gray-300 bg-gray-50 dark:bg-gray-900',
        blue: 'border-blue-300 bg-blue-50 dark:bg-blue-900/20',
        green: 'border-green-300 bg-green-50 dark:bg-green-900/20',
    };

    return (
        <div className={`border-2 rounded-lg p-4 ${colorClasses[color]}`}>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex justify-between">
                {title}
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tasks.length}
                </span>
            </h3>

            <div className="space-y-3 mb-4">
                {tasks.map(task => (
                    <div key={task.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-900 dark:text-gray-100 text-sm font-medium">
                            {task.title}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <span className={`text-xs px-2 py-1 rounded ${
                                task.priority >= 4 ? 'bg-red-100 text-red-800' :
                                task.priority >= 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                P{task.priority}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {showForm ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        placeholder="Task title"
                        className="w-full px-2 py-1 text-sm border rounded mb-2 dark:bg-gray-700"
                        required
                    />
                    <div className="flex space-x-2">
                        <button type="submit" className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                            Add
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} className="px-2 py-1 text-xs text-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button onClick={() => setShowForm(true)} className="text-sm text-gray-500 hover:text-gray-700">
                    + Add task
                </button>
            )}
        </div>
    );
}
