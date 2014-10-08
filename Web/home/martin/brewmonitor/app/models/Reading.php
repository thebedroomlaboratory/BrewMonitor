<?php

// app/models/Reading.php

class Reading extends Eloquent {
        // let eloquent know that these attributes will be
	// available for mass assignment
	protected $fillable = array('device', 'temp'); 
}

