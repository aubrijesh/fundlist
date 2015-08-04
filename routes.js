var fs = require('fs');

module.exports = function(app) {

	app.get('/', function (req, res) {
	    res.send('Hello World');
	});

	app.get('/data/:type', function (req, res) {
		var file = __dirname + '/data/' + req.params.type +'.json';
	    fs.readFile(file, 'utf8', function (err, data) {
			if (err){
				throw err;
				data = [];
			}
			res.send(data);
		});
	});
};