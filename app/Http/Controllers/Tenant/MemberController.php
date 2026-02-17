<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $teamId = auth()->user()->team_id;

        $members = User::where('team_id', $teamId)
            ->withCount('tasks')
            ->orderBy('role')
            ->orderBy('name')
            ->paginate(20);

        return Inertia::render('Tenant/Members/Index', [
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:admin,manager,member',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            ...$validated,
            'team_id' => auth()->user()->team_id,
        ]);

        return back()->with('success', 'Member added');
    }

    public function update(Request $request, User $user)
    {
        $this->authorizeTeam($user);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:admin,manager,member',
        ]);

        if ($user->role === 'super_admin') {
            abort(403, 'Cannot modify super admin');
        }

        $user->update($validated);

        return back()->with('success', 'Member updated');
    }

    public function destroy(User $user)
    {
        $this->authorizeTeam($user);

        if ($user->role === 'super_admin') {
            abort(403, 'Cannot delete super admin');
        }

        if ($user->id === auth()->id()) {
            abort(403, 'Cannot delete yourself');
        }

        $user->delete();

        return back()->with('success', 'Member removed');
    }

    private function authorizeTeam(User $user)
    {
        if ($user->team_id !== auth()->user()->team_id) {
            abort(403);
        }
    }
}
