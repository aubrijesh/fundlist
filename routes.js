var fs = require('fs');


function getFile (filename, res){
	var file = __dirname + '/data/' + filename +'.json';
    fs.readFile(file, 'utf8', function (err, data) {
		if (err){
			throw err;
			data = [];
		}
		res.send(data);
	});
}


module.exports = function(app) {

	app.get('/', function (req, res) {
	    res.send('Hello World');
	});

	app.get('/data/:type', function (req, res) {
		getFile(req.params.type, res);
	});
};