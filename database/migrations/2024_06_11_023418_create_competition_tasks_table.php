<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('competition_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('tasks');
            $table->integer('level');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('competition_tasks');
    }
};