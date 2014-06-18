var id = require('node-uuid');
var io = require('socket.io').listen(3000);

//var mongo = require('mongoskin');

//mongo.db(localhost:27017/justmilk?auto_reconnect=true&poolsize=5,safe:true);

//var collection = db.collection('data', function(err, collection) {});
//var usrCollection = db.collection('user', function(err, collection) {});


var id;
var url1,url2,url3,client,referrer, ww,wh,vw,vh,wx,wy,wz,a,b,c,e,f,g,h,i,k,ha,ib,kc;
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
    
   // usrCollection.insert({'uuid':id,'ip':address,'timestamp':time});
  // console.log({'uuidcd ':id,'ip':address,'timestamp':time});
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
	
		console.log("Info Signal Received. Parameters: " +url1 +'\n'+url2+'\n'+url3+'\n'+client+'\n'+referrer+'\n'+ww+'\n'+wh+'\n'+vw+'\n'+vh+'\n');
    });
	

        
	socket.on('Move', function(msg){

        h=msg.x;
        i=msg.y;
        k=msg.timestamp;
	    console.log("Info Signal Received. Parameters move: "+h+'\n'+i+'\n'+k+'\n');
    });
	socket.on('size', function(msg){

        ha = msg.w;
        ib = msg.h;
        kc=msg.timestamp;
	    console.log("Info Signal Received. Parameters resize: "+ha+'\n'+ib+'\n'+kc+'\n');
    });
	socket.on('touch', function(msg){

        h=msg.x;
        i=msg.y;
        k=msg.timestamp;
	    console.log("Info Signal Received. Parameters touch: "+h+'\n'+i+'\n'+k+'\n');
    });
	
	
	
	socket.on('down', function(msg){

       
        wz=msg.timestamp;
	    console.log("Info Signal Received. Parameters keypress:"+wz+'\n');
    });
	socket.on('focus', function(msg){

       // wx=msg.x;
        //wy=msg.y;
        wz=msg.timestamp;
	    console.log("Info Signal Received. Parameters keypress:"+wz+'\n');
    });
	
	socket.on('Click', function(msg){
        
                          a=msg.x;
                          b=msg.y;
                          c=msg.timestamp;
	    console.log("Info Signal Received. Parameters click: "+a+'\n'+b+'\n'+c+'\n');
    });
	socket.on('scroll', function(msg){
        
                          e=msg.x;
                          f=msg.y;
                          g=msg.timestamp;
	    console.log("Info Signal Received. Parameters click: "+e+'\n'+f+'\n'+g+'\n');
    });
	
});

