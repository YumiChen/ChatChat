var express = require('express');
var socket = require('socket.io');
var BodyParser = require( 'body-parser' );
var router = require("./server/routes");
var config = require("./config");
var passportService = require("./server/passport");
process.env.NODE_ENV = config.env;

// App setup
var app = express(),
    port = process.env.PORT || config.port;
var server = app.listen(port, function(){
    console.log('listening for requests on port ' + port);
});


// Static files
app.use(express.static('public'));


app.use( BodyParser.urlencoded( { extended: false } ) );
app.use( BodyParser.json() );

// jwt auth
app.use(passportService.initialize());

app.use("/",router);


// hmr
if(process.env.NODE_ENV != 'production'){

    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);

    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");

    // set hot-reload
    app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: config[0].output.publicPath,
    stats: {
        colors: true,
    },
    historyApiFallback: true,
    }));

    app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    }));
}else{
    var poke = require("./poke");
}


// Socket setup & event emitter setup
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

});
