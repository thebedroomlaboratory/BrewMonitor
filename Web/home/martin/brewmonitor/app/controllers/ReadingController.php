<?php

class ReadingController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$records = Reading::get();
		return Response::json($records->reverse());
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
			'temp' => Input::get('temp')
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
