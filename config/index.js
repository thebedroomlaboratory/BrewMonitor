var config = {
	mongo : {
		uri: 'mongodb://localhost/brewmonitor-dev',
		options: {
	      db: {
	        safe: true
	      }
	    },
	    seedDB: false
	}
};

module.exports = config;