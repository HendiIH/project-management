import TenantLayout from '@/Layouts/TenantLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FixedSizeList as List } from 'react-window';
import { useMemo, useState } from 'react';
import { PageProps, Project } from '@/types';

interface ProjectsIndexProps extends PageProps {
    projects: {
        data: Project[];
    };
}

export default function ProjectsIndex({ auth, projects }: ProjectsIndexProps) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing } = useForm({
        name: '',
        description: '',
        status: 'active',
        due_date: '',
    });

    const projectList = useMemo(() => projects.data, [projects.data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/projects', {
            onSuccess: () => setShowModal(false),
        });
    };

    const Row = ({ index, style }) => {
        const project = projectList[index];
        return (
            <div style={style} className="px-6">
                <Link
                    href={`/projects/${project.id}`}
                    className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {project.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                                {project.description}
                            </p>
                            <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{project.tasks_count} tasks</span>
                                <span>·</span>
                                <span>Due {project.due_date || 'N/A'}</span>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {project.status}
                        </span>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <TenantLayout auth={auth}>
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Projects
                        </h1>
                        {auth.user.role !== 'member' && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                + New Project
                            </button>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">
                                {projectList.length} projects
                            </p>
                        </div>

                        <List
                            height={600}
                            itemCount={projectList.length}
                            itemSize={140}
                            width="100%"
                        >
                            {Row}
                        </List>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create Project</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                    rows={3}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Due Date</label>
                                <input
                                    type="date"
                                    value={data.due_date}
                                    onChange={e => setData('due_date', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </TenantLayout>
    );
}
