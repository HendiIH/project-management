<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_tenants' => Team::where('type', 'tenant')->count(),
            'active_tenants' => Team::where('type', 'tenant')->where('is_active', true)->count(),
            'total_users' => User::where('team_id', '>', 1)->count(),
            'total_projects' => \App\Models\Project::whereIn('team_id', Team::where('type', 'tenant')->pluck('id'))->count(),
        ];

        $recentTenants = Team::with('owner')
            ->where('type', 'tenant')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentTenants' => $recentTenants,
        ]);
    }
}
