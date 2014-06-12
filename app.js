var id = require('node-uuid');
var io = require('socket.io').listen(3000);
var mongo = require('mongoskin');

mongo.db(localhost:27017/justmilk?auto_reconnect=true&poolsize=5,safe:true);

var collection = db.collection('data', function(err, collection) {});
var usrCollection = db.collection('user', function(err, collection) {});

var id;
var url1,url2,url3,client,referrer, ww,wh,vw,vh;
//open socket
io.sockets.on('connection', function(socket) {
	socket.on('UUID', function(message) {
		id = message.uuid;
	});
    socket.on('New', function(msg){
        //generate uuid and put it in the buffer.
        var buffer = id.v4();
        console.log(buffer);
        socket.emit('NewID',{'uuid':buffer});
        id = buffer;
    });
    socket.on('unsupported', function(msg){
        id = null;
    });

    var address = socket.handshake.address;
    var time = new Date();
    
    usrCollection.insert({'uuid':id,'ip':address,'timestamp':time});

    socket.on('info', function(msg){
        url1= msg.url1;
        url2 = msg.url2;
        url3 = msg.url3;
        client = msg.client;
        referrer = msg.ref;
        ww = msg.w;
        wh = msg.h;
        vw = msg.vw;
        vh = msg.vh;
    });

    socket.on('Move', function(msg){
        collection.insert('url1':url1,
                          'url2':url2,
                          'url3':url3,
                          'client':client,
                          'referrer':referrer,
                          'windowWidth':ww,
                          'windowHeight':wh,
                          'viewWidth':vw,
                          'viewHeight':vh,
                          'event':'Move',
                          'x':msg.x,
                          'y':msg.y,
                          'timestamp':msg.timestamp);
    });
    socket.on('Click', function(msg){
        collection.insert('url1':url1,
                          'url2':url2,
                          'url3':url3,
                          'client':client,
                          'referrer':referrer,
                          'windowWidth':ww,
                          'windowHeight':wh,
                          'viewWidth':vw,
                          'viewHeight':vh,
                          'event':'Click',
                          'x':msg.x,
                          'y':msg.y,
                          'timestamp':msg.timestamp);
    });
    socket.on('scroll', function(msg){
        collection.insert('url1':url1,
                          'url2':url2,
                          'url3':url3,
                          'client':client,
                          'referrer':referrer,
                          'windowWidth':ww,
                          'windowHeight':wh,
                          'viewWidth':vw,
                          'viewHeight':vh,
                          'event':'Scroll',
                          'x':msg.x,
                          'y':msg.y,
                          'timestamp':msg.timestamp);
    });
});
