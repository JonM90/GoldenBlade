var socket = io.connect();
//the enemy player list
const enemies = [];

// let gameProperties = {
// 	gameWidth: 3000,
// 	gameHeight: 1000,
// 	inGame: false
// 	//gameDiv: 'game',
// };

function onsocketConnected () {
	console.log("Connected to server");
	//createPlayer();
	gameProperties.inGame = true;
	// send the server our initialPos and tell it we are connected
	socket.emit('newPlayer', {x: 0, y: 0, angle: 0});
}

//This is where we use socket id to search enemy list & find the right enemy of the id.
function findPlayerById (id) {
	for (var i = 0; i < enemies.length; i++) {
		if (enemies[i].id === id) return enemies[i];
	}
}
// When server notifies of client disconnection, we find client and remove from our game
function onRemovePlayer (data) {
	let removePlayer = findPlayerById(data.id);
	// Player not found
	if (!removePlayer) {
		console.log('Player not found: ', data.id)
		return;
	}
	removePlayer.player.destroy();
	enemies.splice(enemies.indexOf(removePlayer), 1);
}
//let player;
// function createPlayer () {
// 	player = game.add.graphics(0, 0);
// 	player.radius = 100;

// 	// set a fill and line style
// 	player.beginFill(0xffd900);
// 	player.lineStyle(2, 0xffd900, 1);
// 	player.drawCircle(0, 0, player.radius * 2);
// 	player.endFill();
// 	player.anchor.setTo(0.5, 0.5);
// 	player.bodySize = player.radius;

// 	// draw a shape
// 	game.physics.p2.enableBody(player, true);
// 	player.body.clearShapes();
// 	player.body.addCircle(player.bodySize, 0, 0);
// 	player.body.data.shapes[0].sensor = true;
// }
// Enemy class.
var remotePlayer = function (id, startx, starty, startAngle) {
	this.x = startx;
	this.y = starty;
	//this is the unique socket id. We use it as a unique name for enemy
	this.id = id;
	this.angle = startAngle;
	this.player = game.add.graphics(this.x, this.y);
	this.player.radius = 100;
	// set a fill and line style
	this.player.beginFill(0xffd900);
	this.player.lineStyle(2, 0xffd900, 1);
	this.player.drawCircle(0, 0, this.player.radius * 2);
	this.player.endFill();
	this.player.anchor.setTo(0.5, 0.5);
	this.player.bodySize = this.player.radius;
	// draw a shape
	game.physics.p2.enableBody(this.player, true);
	this.player.body.clearShapes();
	this.player.body.addCircle(this.player.bodySize, 0 , 0);
	this.player.body.data.shapes[0].sensor = true;
}
//Server will tell us when a new enemy player connects to the server.
//We create a new enemy in our game.
function onNewPlayer (data) {
	console.log(data);
	//enemy object
	var newEnemy = new remotePlayer(data.id, data.x, data.y, data.angle);
	enemies.push(newEnemy);
}
//Server tells us there is a new enemy movement. We find the moved enemy
//and sync the enemy movement with the server
function onEnemyMove (data) {
	console.log(data.id);
	console.log('Enemies', enemies);
	var movePlayer = findPlayerById (data.id);
	if (!movePlayer) {
		return;
	}
	movePlayer.player.body.x = data.x;
	movePlayer.player.body.y = data.y;
	movePlayer.player.angle = data.angle;
}

//ONCREATE
// console.log("client started");
// socket.on("connect", onsocketConnected);

//listen to new enemy connections
// socket.on("newEnemyPlayer", onNewPlayer);
// //listen to enemy movement
// socket.on("enemyMove", onEnemyMove);
// // when received rP, remove the player passed;
// socket.on('removePlayer', onRemovePlayer);

//ONUPDATE
//Send a new position data to the server
//socket.emit('movePlayer', {x: player.x, y: player.y, angle: player.angle});

//BackgroundForeverFrame
    // frames = Phaser.Animation.generateFrameNames('frame', 2, 30, '', 2)
    // frames.unshift('frame02')

// var gameBootstrapper = {
//     init: function(gameContainerElementId){
// 		game.state.add('Game', Game);
// 		game.state.start('Game');
//     }
// };
// gameBootstrapper.init("gameDiv");
