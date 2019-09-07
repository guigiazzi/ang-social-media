//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/ang-social-media'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/ang-social-media/index.html'));
});

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);