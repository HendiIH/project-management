import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Team, User, Project } from '@/types';

interface TenantShowPageProperties extends PageProps {
    tenant: Team & {
        users: User[];
        projects: Project[];
    };
}

export default function TenantShowPage({ auth, tenant }: TenantShowPageProperties) {
    const activeUsers = tenant.users.filter(user => user.role !== 'super_admin');
    const totalTasks = tenant.projects.reduce((sum, project) => sum + (project.tasks?.length || 0), 0);

    return (
        <AdminLayout auth={auth}>
            <Head title={`${tenant.name} - Tenant Details`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4 mb-8">
                        <Link href="/admin/tenants" className="text-gray-500 hover:text-gray-700">
                            ← Back to Tenants
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {tenant.name}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Created: {new Date(tenant.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                                tenant.is_active 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                                {tenant.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {activeUsers.length}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">Users</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {tenant.projects.length}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">Projects</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {totalTasks}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">Tasks</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Users ({activeUsers.length})
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {activeUsers.map(user => (
                                    <div key={user.id} className="px-6 py-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.role === 'admin' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : user.role === 'manager'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {activeUsers.length === 0 && (
                                    <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No users in this tenant
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Projects ({tenant.projects.length})
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {tenant.projects.map(project => (
                                    <div key={project.id} className="px-6 py-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {project.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {project.tasks?.length || 0} tasks
                                                </p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                project.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : project.status === 'completed'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {tenant.projects.length === 0 && (
                                    <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No projects in this tenant
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
