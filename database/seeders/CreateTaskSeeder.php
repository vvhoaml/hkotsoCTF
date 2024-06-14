<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class CreateTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Task::create([
            'theme' => 'simple math task',
            'task' => '2 + 2',
            'level' => '1',
            'flag' => '4',
        ]);
    }
}