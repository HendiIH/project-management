import { Link } from '@inertiajs/react';
import { User } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    auth: {
        user: User;
    };
}

export default function AdminLayout({ children, auth }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/admin/dashboard" className="text-xl font-bold text-gray-800 dark:text-white">
                                Admin Panel
                            </Link>
                            <div className="hidden sm:flex ml-10 space-x-8">
                                <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 dark:text-gray-300">
                                    Dashboard
                                </Link>
                                <Link href="/admin/tenants" className="text-gray-500 hover:text-gray-700 dark:text-gray-300">
                                    Tenants
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {auth.user.name}
                            </span>
                            <Link href="/logout" method="post" as="button" className="text-sm text-red-600 hover:text-red-800">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
