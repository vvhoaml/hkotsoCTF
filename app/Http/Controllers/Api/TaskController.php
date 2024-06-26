<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TaskResource::collection(Task::query()->orderBy('id', 'desc')->paginate(100));
    }

		// Возвращает список заданий, беря данные из Tasks и сортируя их по id
		public function gymTasks()
		{
				return TaskResource::collection(Task::query()->orderBy('id', 'desc')->paginate(100));
		}

		// 
		public function solution(Request $request, $id)
		{
				$task = Task::find($id);
				$correct = $request->answer === $task->flag;
				return response()->json(['correct' => $correct]);
		}

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreTaskRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        $task = Task::create($data);

        return response(new TaskResource($task) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        return response(new TaskResource($task), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateTaskRequest $request
     * @param \App\Models\Task                   $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $task->update($data);

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response("", 204);
    }
}
