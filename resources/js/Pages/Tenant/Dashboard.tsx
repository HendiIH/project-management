import TenantLayout from '@/Layouts/TenantLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Project } from '@/types';

interface TenantDashboardProps extends PageProps {
    stats: {
        total_projects: number;
        active_projects: number;
        completed_projects: number;
        total_tasks: number;
    };
    recentProjects: Project[];
}

export default function TenantDashboard({ auth, stats, recentProjects }: TenantDashboardProps) {
    return (
        <TenantLayout auth={auth}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Dashboard
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <StatCard title="Total Projects" value={stats.total_projects} color="blue" />
                        <StatCard title="Active" value={stats.active_projects} color="green" />
                        <StatCard title="Completed" value={stats.completed_projects} color="purple" />
                        <StatCard title="Total Tasks" value={stats.total_tasks} color="orange" />
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Recent Projects
                                </h3>
                                <Link href="/projects" className="text-blue-600 hover:text-blue-800">
                                    View All →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentProjects.map(project => (
                                    <Link
                                        key={project.id}
                                        href={`/projects/${project.id}`}
                                        className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                    {project.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {project.tasks_count} tasks · Due {project.due_date || 'N/A'}
                                                </p>
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
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TenantLayout>
    );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
    const colors = {
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${colors[color]}`}>
                {title}
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {value}
            </div>
        </div>
    );
}
