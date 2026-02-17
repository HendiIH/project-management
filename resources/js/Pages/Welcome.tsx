import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Grid Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />

                <div className="relative z-10">
                    {/* Navigation */}
                    <nav className="flex items-center justify-between px-8 py-6 lg:px-16">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl opacity-50" />
                                <svg 
                                    className="relative w-10 h-10 text-white" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={1.5} 
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                ProjectHub
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    <span className="relative z-10">Dashboard</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-2.5 rounded-full text-slate-300 hover:text-white transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/25"
                                    >
                                        <span className="relative z-10">Get Started</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Hero Section */}
                    <main className="px-8 lg:px-16 pt-20 pb-32">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-sm text-slate-300">Multi-Tenant SaaS Platform</span>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                    Manage Projects
                                    <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                        Like Never Before
                                    </span>
                                </h1>

                                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                                    Streamline your workflow with our comprehensive project management platform. 
                                    Built for teams, designed for scale.
                                </p>

                                <div className="flex items-center justify-center gap-4">
                                    <Link
                                        href={route('login')}
                                        className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/25"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Start Managing
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </div>
                            </div>

                            {/* Feature Cards */}
                            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        ),
                                        title: 'Multi-Tenant',
                                        desc: 'Manage multiple organizations with complete data isolation',
                                        gradient: 'from-blue-500/20 to-cyan-500/20'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        ),
                                        title: 'Kanban Boards',
                                        desc: 'Visual task management with drag-and-drop interface',
                                        gradient: 'from-purple-500/20 to-pink-500/20'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        ),
                                        title: 'Team Collaboration',
                                        desc: 'Role-based access control for seamless teamwork',
                                        gradient: 'from-emerald-500/20 to-cyan-500/20'
                                    }
                                ].map((feature, idx) => (
                                    <div 
                                        key={idx}
                                        className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity`} />
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                            <p className="text-sm text-slate-400">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="px-8 lg:px-16 py-8 border-t border-white/10">
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">
                                © 2026 ProjectHub. Built with Laravel & React.
                            </p>
                            <div className="flex items-center gap-6">
                                <span className="text-sm text-slate-500">Multi-Tenant SaaS</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-sm text-slate-500">Role-Based Access</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-sm text-slate-500">Kanban Ready</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
