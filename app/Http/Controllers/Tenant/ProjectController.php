<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $teamId = auth()->user()->team_id;

        $projects = Project::withCount('tasks')
            ->where('team_id', $teamId)
            ->latest()
            ->paginate(20);

        return Inertia::render('Tenant/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:active,completed,archived',
            'due_date' => 'nullable|date',
        ]);

        $project = Project::create([
            ...$validated,
            'team_id' => auth()->user()->team_id,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('projects.show', $project->id)->with('success', 'Project created');
    }

    public function show(Project $project)
    {
        $this->authorizeTeam($project);

        $project->load(['tasks.user', 'tasks' => function ($query) {
            $query->orderBy('status')->orderBy('priority', 'desc');
        }]);

        return Inertia::render('Tenant/Projects/Show', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorizeTeam($project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:active,completed,archived',
            'due_date' => 'nullable|date',
        ]);

        $project->update($validated);

        return back()->with('success', 'Project updated');
    }

    public function destroy(Project $project)
    {
        $this->authorizeTeam($project);

        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted');
    }

    private function authorizeTeam(Project $project)
    {
        if ($project->team_id !== auth()->user()->team_id) {
            abort(403);
        }
    }
}
