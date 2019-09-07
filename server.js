//Install express server
var path = require('path');
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

// Serve only the static files form the dist directory
app.use(express.static('./dist/ang-social-media'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/ang-social-media/index.html'));
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);