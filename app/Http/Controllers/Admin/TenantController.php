<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Team::with('owner')
            ->withCount('users', 'projects')
            ->where('type', 'tenant')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Tenants/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email|unique:users,email',
            'admin_password' => 'required|string|min:8',
        ]);

        $tenant = Team::create([
            'name' => $validated['name'],
            'type' => 'tenant',
            'is_active' => true,
            'owner_id' => null,
        ]);

        User::create([
            'name' => $validated['admin_name'],
            'email' => $validated['admin_email'],
            'password' => Hash::make($validated['admin_password']),
            'team_id' => $tenant->id,
            'role' => 'admin',
        ]);

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant created successfully');
    }

    public function show(Team $tenant)
    {
        $tenant->load(['users', 'projects.tasks']);

        return Inertia::render('Admin/Tenants/Show', [
            'tenant' => $tenant,
        ]);
    }

    public function update(Request $request, Team $tenant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $tenant->update($validated);

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant updated successfully');
    }

    public function destroy(Team $tenant)
    {
        if ($tenant->type === 'default') {
            abort(403, 'Cannot delete default team');
        }

        $tenant->delete();

        return redirect()->route('admin.tenants.index')->with('success', 'Tenant deleted successfully');
    }

    public function toggleActive(Team $tenant)
    {
        $tenant->update(['is_active' => !$tenant->is_active]);

        return back()->with('success', 'Tenant status updated');
    }
}
