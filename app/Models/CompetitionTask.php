<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetitionTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'tasks',
        'level',
    ];

		protected $casts = [
			'tasks' => 'array',
	];
}