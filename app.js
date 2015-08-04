// ====================== SET UP ==============================
var express = require('express'),
    port = 8000,
    app = express();// create our app w/ express

app.use(express.static(__dirname + '/public'));// set the static files location

// routes ======================================================================
require('./routes.js')(app);


// listen (start app with node app.js) ======================================
app.listen(port);
console.log("App listening on port " + port);