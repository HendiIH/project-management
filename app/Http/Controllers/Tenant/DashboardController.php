<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $teamId = auth()->user()->team_id;

        $stats = [
            'total_projects' => Project::where('team_id', $teamId)->count(),
            'active_projects' => Project::where('team_id', $teamId)->where('status', 'active')->count(),
            'completed_projects' => Project::where('team_id', $teamId)->where('status', 'completed')->count(),
            'total_tasks' => Task::whereIn('project_id', Project::where('team_id', $teamId)->pluck('id'))->count(),
        ];

        $recentProjects = Project::withCount('tasks')
            ->where('team_id', $teamId)
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Tenant/Dashboard', [
            'stats' => $stats,
            'recentProjects' => $recentProjects,
        ]);
    }
}
