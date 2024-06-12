<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

		Route::get('/leaders',[UserController::class, 'leaders']);
		Route::get('/gym', [TaskController::class]);
		Route::get('/lobbies', [CompetitionController::class, 'lobbies']);

		Route::middleware('admin')->group(function () {
			Route::apiResource('/users', UserController::class);
			Route::apiResource('/tasks', TaskController::class);
			Route::apiResource('/competitions', CompetitionController::class);
			Route::apiResource('/competitionTasks', CompetitionController::class);
	});
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);