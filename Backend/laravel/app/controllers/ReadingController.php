<?php

class ReadingController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//$records = Reading::orderBy('id', 'desc')->take(1000)->get();
		//$records = Reading::where('device', '=', 2)->where('created_at', '>', Carbon\Carbon::now()->subDays(30))->whereRaw('id % 30 = 0' )->orderBy('created_at', 'desc')->get();
		$records = Reading::where('device', '=', 2)
				->where('created_at', '>', Carbon\Carbon::now()->subDays(30))
				->orderBy('created_at', 'asc')
				->get();
		return Response::json($records);
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		Reading::create(array(
			'device' => Input::get('device'),
			'temp' => Input::get('temp'),
			'heaton' => Input::get('heaton')
		));

		return Response::json(array('success' => true));
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Reading::destroy($id);

		return Response::json(array('success' => true));
	}


}
