<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Tenant\DashboardController;
use App\Http\Controllers\Tenant\MemberController;
use App\Http\Controllers\Tenant\ProjectController;
use App\Http\Controllers\Tenant\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    // Redirect to appropriate dashboard based on role
    Route::get('/home', function () {
        if (auth()->role === 'super_admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('dashboard');
    })->name('home.redirect');

    Route::post('logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin routes (super_admin only)
    Route::prefix('admin')->middleware('role:super_admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/tenants');
        Route::resource('tenants', TenantController::class)->names('admin.tenants');
    });

    // Tenant routes (admin, manager, member)
    Route::middleware('role:admin,manager,member')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('projects', ProjectController::class);
        Route::resource('tasks', TaskController::class);

        // Members (admin only)
        Route::middleware('role:admin,manager')->group(function () {
            Route::resource('members', MemberController::class);
        });
    });
});

require __DIR__ . '/auth.php';
