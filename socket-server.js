
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var sio = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = sio.listen(server);
var util = require('util');
var socketUser = {};

io.sockets.on('connection', function(socket){
  // console.log(util.inspect(socket, {colors: true}));
  //响应连接
  io.sockets.emit('conn', {text: 'socketId:' + socket.id});

  //监听用户登录并存储socket
  socket.on('login', function(data, fn){
    socketUser[socket.id] = {'c_id': data.c_id, 'guid': data.guid, 'price': data.price, 'socket': socket};
  });

  //监听断线
  socket.on('disconnect', function(){
    console.log('-链接断开['+ socket.id + ']-');
    delete socketUser[socket.id];
  });


  socket.on('postprice', function (data,fn) {
    console.log('-用户出价['+data.guid+']-');
    for(var values in socketUser){
      socketUser[values].socket.emit('receive',{'nowprice': 9992});
    }
  });

});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
