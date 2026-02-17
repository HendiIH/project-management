import TenantLayout from '@/Layouts/TenantLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Task } from '@/types';

interface TasksIndexPageProperties extends PageProps {
    tasks: {
        data: Task[];
    };
}

export default function TasksIndexPage({ auth, tasks }: TasksIndexPageProperties) {
    const todoTasks = tasks.data.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.data.filter(task => task.status === 'in_progress');
    const doneTasks = tasks.data.filter(task => task.status === 'done');

    function getPriorityBadgeStyle(priority: number) {
        if (priority >= 4) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        if (priority >= 2) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }

    function getStatusBadgeStyle(status: string) {
        switch (status) {
            case 'done':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }

    function formatStatusLabel(status: string) {
        return status.replace('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    }

    return (
        <TenantLayout auth={auth}>
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Tasks
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                {tasks.data.length} total tasks
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border-l-4 border-gray-400">
                            <p className="text-sm text-gray-500 dark:text-gray-400">To Do</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{todoTasks.length}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border-l-4 border-blue-400">
                            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressTasks.length}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border-l-4 border-green-400">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Done</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{doneTasks.length}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Task
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Project
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Assignee
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Priority
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {tasks.data.map(task => (
                                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {task.title}
                                            </p>
                                            {task.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                                                    {task.description}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {task.project?.name || 'Unknown Project'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {task.user?.name || 'Unassigned'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeStyle(task.status)}`}>
                                                {formatStatusLabel(task.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadgeStyle(task.priority)}`}>
                                                Priority {task.priority}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {tasks.data.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                No tasks found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}
