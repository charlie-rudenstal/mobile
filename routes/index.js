var request = require('request');

/*
 * GET home page.
 */

exports.index = function(req, res){

	// for regular caching and to make livejs behave nicely 
	// (will refresh constantly with dynamic data otherwise)
	if (!res.getHeader('Cache-Control')) {
		res.setHeader('Cache-Control', 'public, max-age=' + (60 * 5));
	}

	// TOOD: Create a configuration parameter excluded from git 
	var tableau = request('http://api.example.org', function(error, response, body) {

		var channels = [];
		try {
			channels = JSON.parse(body).channels;
		} catch (e) {}

  		res.render('index', { title: 'tv.nu',
  							  channels: channels });

	});

};