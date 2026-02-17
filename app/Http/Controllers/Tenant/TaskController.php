<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $teamId = auth()->user()->team_id;
        $projectId = $request->get('project_id');

        $tasks = Task::whereHas('project', function ($query) use ($teamId) {
            $query->where('team_id', $teamId);
        });

        if ($projectId) {
            $tasks->where('project_id', $projectId);
        }

        $tasks = $tasks->with('user', 'project')
            ->orderBy('status')
            ->orderBy('priority', 'desc')
            ->paginate(20);

        return Inertia::render('Tenant/Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,done',
            'priority' => 'integer|min:1|max:5',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $project = Project::findOrFail($validated['project_id']);
        $this->authorizeTeam($project);

        Task::create([
            ...$validated,
            'user_id' => $validated['user_id'] ?? auth()->id(),
        ]);

        return back()->with('success', 'Task created');
    }

    public function update(Request $request, Task $task)
    {
        $this->authorizeTeam($task->project);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,done',
            'priority' => 'integer|min:1|max:5',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);

        return back()->with('success', 'Task updated');
    }

    public function destroy(Task $task)
    {
        $this->authorizeTeam($task->project);

        $task->delete();

        return back()->with('success', 'Task deleted');
    }

    private function authorizeTeam(Project $project)
    {
        if ($project->team_id !== auth()->user()->team_id) {
            abort(403);
        }
    }
}
