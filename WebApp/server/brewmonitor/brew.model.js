var mongoose = require ("mongoose");

var Schema = mongoose.Schema;



var BrewMonitor = new Schema({
	devid : { type: Number, required: true},
	temps : { type : Array },
	timestamp : { type : Date, default : Date.now },
	userid: {type: Number, required: true}
});

var BrewMonitorModel = mongoose.model('BrewMonitor', BrewMonitor);

module.exports  = BrewMonitorModel;