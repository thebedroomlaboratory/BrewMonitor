<?php
// app/database/seeds/ReadingTableSeeder.php

class ReadingTableSeeder extends Seeder
{

	public function run()
	{
		DB::table('readings')->delete();

		Reading::create(array(
			'device' => 1,
			'temp' => 19.5,
			'heaton' => 1,
			'created_at' => \Carbon\Carbon::now()->subDays(2)->toDateTimeString(),
			'updated_at' => \Carbon\Carbon::now()->subDays(2)->toDateTimeString()
		));

		Reading::create(array(
			'device' => 1,
			'temp' => 19.7,
			'heaton' => 1,
			'created_at' => \Carbon\Carbon::now()->subDays(1)->toDateTimeString(),
			'updated_at' => \Carbon\Carbon::now()->subDays(1)->toDateTimeString()
		));

		Reading::create(array(
			'device' => 1,
			'temp' => 20.1,
			'heaton' => 0,
			'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
			'updated_at' => \Carbon\Carbon::now()->toDateTimeString()
		));
	}

}
