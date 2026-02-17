<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('team_id')->default(1)->constrained()->onDelete('cascade');
            $table->enum('role', ['super_admin', 'admin', 'manager', 'member'])->default('member');
            $table->index(['team_id', 'role']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['team_id', 'role']);
            $table->dropForeign(['team_id']);
            $table->dropColumn(['team_id', 'role']);
        });
    }
};
