<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReadingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('readings', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('device');
			$table->float('temp');
			$table->decimal('stdtemp', 3, 2);
			$table->decimal('heaton', 6, 4);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('readings');
	}

}
