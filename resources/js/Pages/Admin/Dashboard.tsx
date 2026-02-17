import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Team } from '@/types';

interface AdminDashboardProps extends PageProps {
    stats: {
        total_tenants: number;
        active_tenants: number;
        total_users: number;
        total_projects: number;
    };
    recentTenants: Team[];
}

export default function AdminDashboard({ auth, stats, recentTenants }: AdminDashboardProps) {
    return (
        <AdminLayout auth={auth}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Admin Dashboard
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <StatCard title="Total Tenants" value={stats.total_tenants} color="blue" />
                        <StatCard title="Active Tenants" value={stats.active_tenants} color="green" />
                        <StatCard title="Total Users" value={stats.total_users} color="purple" />
                        <StatCard title="Total Projects" value={stats.total_projects} color="orange" />
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Recent Tenants
                                </h3>
                                <Link
                                    href="/admin/tenants"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View All →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentTenants.map(tenant => (
                                    <div key={tenant.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                    {tenant.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {tenant.users_count} users · {tenant.projects_count} projects
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                tenant.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {tenant.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
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
