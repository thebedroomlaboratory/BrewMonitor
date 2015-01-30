<?php
// app/database/seeds/ReadingTableSeeder.php

class ReadingTableSeeder extends Seeder
{

	public function run()
	{
		DB::table('readings')->delete();

		Reading::create(array(
			'device' => 1,
			'temp' => 20.5,
			'heaton' => 0
		));

		Reading::create(array(
			'device' => 1,
			'temp' => 20.7
			'heaton' => 0
		));

		Reading::create(array(
			'device' => 1,
			'temp' => 21.0
			'heaton' => 0
		));
	}

}
