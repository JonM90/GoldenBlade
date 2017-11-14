const path = require('path');
const socketio = require('socket.io');
const express = require('express');
//const Phaser = require('phaser');

var app = express();
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

let server = app.listen(process.env.PORT || 3000, () => console.log(`Listening on Port 3000`));

var playerList = [];
//a player class in the server
var Player = function (startX, startY, startAngle) {
  this.x = startX
  this.y = startY
  this.angle = startAngle
}

// when a new player connects, we make a new instance of the player object,
// and send a new player message to the client.
function onNewplayer (data) {
	console.log(data);

	//new player instance
	var newPlayer = new Player(data.x, data.y, data.angle);
	console.log(newPlayer);
	console.log("created new player with id " + this.id);
	newPlayer.id = this.id;
	//information to be sent to all clients except sender
	var currentInfo = {
		id: newPlayer.id,
		x: newPlayer.x,
		y: newPlayer.y,
		angle: newPlayer.angle,
	};

	//send to the new player about everyone who is already connected.
	for (let i = 0; i < playerList.length; i++) {
		let existingPlayer = playerList[i];
		var playerInfo = {
			id: existingPlayer.id,
			x: existingPlayer.x,
			y: existingPlayer.y,
			angle: existingPlayer.angle,
		};
		console.log("pushing player");
		//send message to the sender-client only
		this.emit("newEnemyPlayer", playerInfo);
	}

	//send message to every connected client except the sender
	this.broadcast.emit('newEnemyPlayer', currentInfo);
	playerList.push(newPlayer);
}

//update the player position and send the information back to every client except sender
function onMovePlayer (data) {
	var movePlayer = findPlayerid(this.id);
	movePlayer.x = data.x;
	movePlayer.y = data.y;
	movePlayer.angle = data.angle;

	var moveplayerData = {
		id: movePlayer.id,
		x: movePlayer.x,
		y: movePlayer.y,
		angle: movePlayer.angle
	}

	//send message to every connected client except the sender
	this.broadcast.emit('enemyMove', moveplayerData);
}

//call when a client disconnects and tell the clients except sender to remove the disconnected player
function onClientdisconnect() {
	console.log('Client disconnected...');

	var removePlayer = findPlayerid(this.id);
	if (removePlayer) playerList.splice(playerList.indexOf(removePlayer), 1);
	console.log("...removing player " + this.id);

	//send message to every connected client except the sender
	this.broadcast.emit('removePlayer', {id: this.id});
}

// find player by the the unique socket id
function findPlayerid(id) {
	for (var i = 0; i < playerList.length; i++) {
		if (playerList[i].id === id) return playerList[i];
	}
	return false;
}

 // io connection
var io = socketio(server, {});

io.sockets.on('connection', function(socket){
	console.log("Socket connected");

	// listen for disconnection;
	socket.on('disconnect', onClientdisconnect);

	// listen for new player
	socket.on("newPlayer", onNewplayer);
	// listen for player position update
	socket.on("movePlayer", onMovePlayer);
});
//module.exports = app;
