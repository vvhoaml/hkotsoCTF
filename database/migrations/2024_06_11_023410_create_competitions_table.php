<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('teams');
            $table->string('tasks');
            $table->string('result');
            $table->enum('status', ['активно', 'завершено'])->default('активно');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('competitions');
    }
};