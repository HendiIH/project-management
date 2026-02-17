<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $defaultTeam = Team::create([
            'name' => 'System',
            'type' => 'default',
            'is_active' => true,
            'owner_id' => null,
        ]);

        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@app.com',
            'password' => bcrypt('password'),
            'team_id' => $defaultTeam->id,
            'role' => 'super_admin',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'team_id' => $defaultTeam->id,
            'role' => 'member',
        ]);
    }
}
