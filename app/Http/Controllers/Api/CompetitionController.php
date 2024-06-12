<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCompetitionRequest;
use App\Http\Requests\UpdateCompetitionRequest;
use App\Http\Resources\CompetitionResource;
use App\Models\Competition;

class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CompetitionResource::collection(Competition::query()->orderBy('id', 'desc')->paginate(100));
    }

		// Возвращает список соревновательных лобби, беря данные из Competition и сортируя их по id
		public function Lobby()
		{
				return CompetitionResource::collection(Competition::query()->orderBy('id', 'desc')->paginate(100));
		}

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreCompetitionRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCompetitionRequest $request)
    {
        $data = $request->validated();

        $сompetition = Competition::create($data);

        return response(new CompetitionResource($сompetition) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Competition $сompetition
     * @return \Illuminate\Http\Response
     */
    public function show(Competition $сompetition)
    {
        return new CompetitionResource($сompetition);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateCompetitionRequest $request
     * @param \App\Models\Competition                   $сompetition
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompetitionRequest $request, Competition $сompetition)
    {
        $data = $request->validated();

        $сompetition->update($data);

        return new CompetitionResource($сompetition);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Competition $сompetition
     * @return \Illuminate\Http\Response
     */
    public function destroy(Competition $сompetition)
    {
        $сompetition->delete();

        return response("", 204);
    }
}
