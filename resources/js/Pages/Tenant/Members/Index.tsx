import TenantLayout from '@/Layouts/TenantLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps, User } from '@/types';

interface MembersIndexPageProperties extends PageProps {
    members: {
        data: User[];
    };
}

export default function MembersIndexPage({ auth, members }: MembersIndexPageProperties) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const createMemberForm = useForm({
        name: '',
        email: '',
        role: 'member' as const,
        password: '',
    });

    const canManageMembers = ['super_admin', 'admin', 'manager'].includes(auth.user.role);
    const canDeleteMembers = ['super_admin', 'admin'].includes(auth.user.role);

    function handleCreateMemberSubmit(event: React.FormEvent) {
        event.preventDefault();
        createMemberForm.post('/members', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createMemberForm.reset();
            },
        });
    }

    function getRoleBadgeStyle(role: string) {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'manager':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    }

    return (
        <TenantLayout auth={auth}>
            <Head title="Team Members" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Team Members
                        </h1>
                        {canManageMembers && (
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                + Add Member
                            </button>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Tasks
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {members.data.map(member => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {member.name}
                                                {member.id === auth.user.id && (
                                                    <span className="ml-2 text-xs text-gray-400">(You)</span>
                                                )}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {member.email}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeStyle(member.role)}`}>
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {member.tasks_count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {members.data.length === 0 && (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                No members found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                            Add New Member
                        </h2>
                        <form onSubmit={handleCreateMemberSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={createMemberForm.data.name}
                                    onChange={event => createMemberForm.setData('name', event.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={createMemberForm.data.email}
                                    onChange={event => createMemberForm.setData('email', event.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Role
                                </label>
                                <select
                                    value={createMemberForm.data.role}
                                    onChange={event => createMemberForm.setData('role', event.target.value as 'admin' | 'manager' | 'member')}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="member">Member</option>
                                    <option value="manager">Manager</option>
                                    {auth.user.role === 'admin' && <option value="admin">Admin</option>}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={createMemberForm.data.password}
                                    onChange={event => createMemberForm.setData('password', event.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                    minLength={8}
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createMemberForm.processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Add Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </TenantLayout>
    );
}
