// //import Phaser from 'phaser';
// //const Phaser = require('phaser');
// let socket = io.connect();


// let canvasWidth = window.innerWidth * window.devicePixelRatio;
// let canvasHeight = window.innerHeight * window.devicePixelRatio;

// let game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'gameDiv');

// //the enemy player list
// const enemies = [];

// let gameProperties = {
// 	gameWidth: 3000,
// 	gameHeight: 1000,
// 	gameDiv: 'gameDiv',
// 	inGame: false,
// };

// let main = function(game){};

// function onsocketConnected () {
// 	console.log("connected to server");
// 	//createPlayer();
// 	gameProperties.inGame = true;

// 	// send the server our initial position and tell it we are connected
// 	socket.emit('newPlayer', {x: 0, y: 0, angle: 0});
// }

// //This is where we use the socket id to search enemy list & find the right enemy of the id.
// function findPlayerById (id) {
// 	for (var i = 0; i < enemies.length; i++) {
// 		if (enemies[i].id === id) return enemies[i];
// 	}
// }

// // When server notifies of client disconnection, we find client and remove from our game
// function onRemovePlayer (data) {
// 	let removePlayer = findPlayerById(data.id);
// 	// Player not found
// 	if (!removePlayer) {
// 		console.log('Player not found: ', data.id)
// 		return;
// 	}

// 	removePlayer.player.destroy();
// 	enemies.splice(enemies.indexOf(removePlayer), 1);
// }

// //let player;
// // function createPlayer () {
// // 	player = game.add.graphics(0, 0);
// // 	player.radius = 100;

// // 	// set a fill and line style
// // 	player.beginFill(0xffd900);
// // 	player.lineStyle(2, 0xffd900, 1);
// // 	player.drawCircle(0, 0, player.radius * 2);
// // 	player.endFill();
// // 	player.anchor.setTo(0.5, 0.5);
// // 	player.bodySize = player.radius;

// // 	// draw a shape
// // 	game.physics.p2.enableBody(player, true);
// // 	player.body.clearShapes();
// // 	player.body.addCircle(player.bodySize, 0, 0);
// // 	player.body.data.shapes[0].sensor = true;
// // }

// // this is the enemy class.
// var remotePlayer = function (id, startx, starty, startAngle) {
// 	this.x = startx;
// 	this.y = starty;
// 	//this is the unique socket id. We use it as a unique name for enemy
// 	this.id = id;
// 	this.angle = startAngle;

// 	this.player = game.add.graphics(this.x, this.y);
// 	this.player.radius = 100;

// 	// set a fill and line style
// 	this.player.beginFill(0xffd900);
// 	this.player.lineStyle(2, 0xffd900, 1);
// 	this.player.drawCircle(0, 0, this.player.radius * 2);
// 	this.player.endFill();
// 	this.player.anchor.setTo(0.5, 0.5);
// 	this.player.bodySize = this.player.radius;

// 	// draw a shape
// 	game.physics.p2.enableBody(this.player, true);
// 	this.player.body.clearShapes();
// 	this.player.body.addCircle(this.player.bodySize, 0 , 0);
// 	this.player.body.data.shapes[0].sensor = true;
// }

// //Server will tell us when a new enemy player connects to the server.
// //We create a new enemy in our game.
// function onNewPlayer (data) {
// 	console.log(data);
// 	//enemy object
// 	var newEnemy = new remotePlayer(data.id, data.x, data.y, data.angle);
// 	enemies.push(newEnemy);
// }

// //Server tells us there is a new enemy movement. We find the moved enemy
// //and sync the enemy movement with the server
// function onEnemyMove (data) {
// 	console.log(data.id);
// 	console.log('Enemies', enemies);
// 	var movePlayer = findPlayerById (data.id);

// 	if (!movePlayer) {
// 		return;
// 	}
// 	movePlayer.player.body.x = data.x;
// 	movePlayer.player.body.y = data.y;
// 	movePlayer.player.angle = data.angle;
// }

// let player, cursors, stage, ground, hitPlatform, prevCamX = 0;

// main.prototype = {
// 	preload: function() {
// 		//game.stage.disableVisibilityChange = true;
// 		game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
// 		//game.world.setBounds(0, 0, gameProperties.gameWidth, gameProperties.gameHeight, false, false, false, false);
// 		// game.physics.startSystem(Phaser.Physics.P2JS);
// 		// game.physics.p2.setBoundsToWorld(false, false, false, false, false)
// 		// game.physics.p2.gravity.y = 0;
// 		// game.physics.p2.applyGravity = false;
// 		// game.physics.p2.enableBody(game.physics.p2.walls, false);
// 		// // physics start system
// 		// game.physics.p2.setImpactEvents(true);

// 		game.load.image('space', 'assets/starfield.jpg');
// 		game.load.image('stage', 'assets/Stage 1.png');
// 		game.load.image('ground', 'assets/ground.png');
// 		//game.load.spritesheet('warrior', 'assets/warrior.png', 32, 48);
// 		// game.load.spritesheet('Thunderhead', 'assets/Thunderhead.png', 32, 48);
// 		game.load.spritesheet('Centaur', 'assets/CentaurRun.png', 118, 98);
//     },

// 	create: function () {
// 		game.physics.startSystem(Phaser.Physics.ARCADE);
// 		// game.stage.backgroundColor = 0xE1A193;
// 		console.log("client started");
// 		socket.on("connect", onsocketConnected);

// 		//game.add.sprite(0, 0, 'space')
// 		stage = game.add.sprite(0, 0, 'stage');
// 		stage.scale.setTo(1.5, 2.2)
// 		stage.enableBody = true;
// 		//stage.body.immovable = true;
// 		// The player and its settings
//     //player = game.add.sprite(32, game.world.height - 150, 'player');
//     //player = game.add.sprite(300, game.world.height - 150, 'warrior');
//     // player = game.add.sprite(300, game.world.height - 150, 'Thunderhead');
//     player = game.add.sprite(300, game.world.height - 150, 'Centaur');

// 		ground = game.add.group()
// 		//  We will enable physics for any object that is created in this group
// 		ground.enableBody = true;

// 		let turf = ground.create(0, game.world.height - 40, 'ground')
// 		turf.scale.setTo(2.7, 1.4);

// 		//This stops it from falling away when you jump on it
// 		turf.body.immovable = true;

// 		stage.debug = true;
// 		ground.debug = true;
// 		turf.debug = true;
// 		// stage.resizeWorld();
//     stage.wrap = true;


// 		//  We need to enable physics on the player
// 		game.physics.arcade.enable(player);

// 		//  Player physics properties. Give the little guy a slight bounce.
// 		player.body.bounce.y = 0.2;
// 		player.body.gravity.y = 600;
// 		player.body.collideWorldBounds = true;

// 		player.anchor.x = 0.5
// 		//  Our animations...
//     player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

// 		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1)
// 		prevCamX = game.camera.x
// 		//listen to new enemy connections
// 		// socket.on("newEnemyPlayer", onNewPlayer);
// 		// //listen to enemy movement
// 		// socket.on("enemyMove", onEnemyMove);

// 		// // when received rP, remove the player passed;
// 		// socket.on('removePlayer', onRemovePlayer);
// 	},

// 	update: function () {
// 		//hitPlatform =
// 		game.physics.arcade.collide(player, ground);

// 		// emit the player input
// 		cursors = game.input.keyboard.createCursorKeys();
// 		player.body.velocity.x = 0;

// 		if (cursors.up.isDown) {
// 			if (player.body.onFloor()) player.body.velocity.y = -200;
// 		}
// 		if (cursors.left.isDown) {
// 			player.animations.play('right');
// 			player.body.velocity.x = -50;
// 			player.x -= 5;
// 			player.scale.x = -1;
// 			// player.animations.play('left');
// 		} else if (cursors.right.isDown) {
// 			player.animations.play('right');
// 			// game.camera.x += 2;
// 			player.body.velocity.x = 50;
// 			player.x += 5;
// 			player.scale.x = 1;
// 		} else {
// 			player.animations.stop();
// 			player.frame = 4;
// 		}
// 		// if (cursors.up.isDown) {
// 		// 	// game.camera.y -= 2;
// 		// 	player.body.velocity.y = -250;
// 		// 	// player.animations.play('up');
// 		// } else if (cursors.down.isDown) {
// 		// 	// game.camera.y += 2;
// 		// 	player.body.velocity.y = 250;
// 		// 	// player.animations.play('down');
// 		// }
// 		//  Allow the player to jump if they are touching the ground.
// 		// if (cursors.up.isDown && player.body.touching.down) {
// 		// 	player.body.velocity.y = -350;
// 		// }

// 		// if (gameProperties.inGame) {
// 		// 	var pointer = game.input.mousePointer;
// 		// 	if (distanceToPointer(player, pointer) <= 50) {
// 		// 		movetoPointer(player, 0, pointer, 100);
// 		// 	} else {
// 		// 		movetoPointer(player, 500, pointer);
// 		// 	}

// 		// if (cursors.up.isDown) {
// 		// 	if (player.body.onFloor()) player.body.velocity.y = -200;
// 		// }

// 		//Send a new position data to the server
// 		socket.emit('movePlayer', {x: player.x, y: player.y, angle: player.angle});
// 		prevCamX = game.camera.x
// 	}

// 	// render: function() {
// 	// 	game.debug.body(player)
// 	// 	game.debug.bodyInfo(player, 32, 320)
// 	// }
// }


// var gameBootstrapper = {
//     init: function(gameContainerElementId){
// 		game.state.add('main', main);
// 		game.state.start('main');
//     }
// };

// gameBootstrapper.init("gameDiv");


// // function movetoPointer (displayObject, speed, pointer, maxTime) {
// // 	/*
// // 	var bound_limit = 40;
// // 	var upper_bound = bound_limit;
// // 	var bottom_bound = game.world.height - bound_limit;
// // 	var left_bound = bound_limit;
// // 	var right_bound = game.world.width - bound_limit;
// // 	var play_bound = true;

// // 	if (speed === undefined) { speed = 60; }
// // 	pointer = pointer;
// // 	if (maxTime === undefined) { maxTime = 0; }
// // 	*/
// // 	var angle = angleToPointer(displayObject, pointer);

// // 	if (maxTime > 0) {
// // 		//  We know how many pixels we need to move, but how fast?
// // 		speed = distanceToPointer(displayObject, pointer) / (maxTime / 1000);
// // 	}

// // 	/*
// // 	if (displayObject.body.y < upper_bound || displayObject.body.y > bottom_bound) {
// // 		if (!(game.input.worldY > upper_bound && game.input.worldY < bottom_bound)) {
// // 			displayObject.body.velocity.y = 0;
// // 		} else {
// // 			displayObject.body.velocity.x = Math.cos(angle) * speed;
// // 			displayObject.body.velocity.y = Math.sin(angle) * speed;
// // 		}
// // 	} else if (displayObject.body.x < left_bound || displayObject.body.x > right_bound) {
// // 		if (!(game.input.worldX > left_bound && game.input.worldX < right_bound)) {
// // 			displayObject.body.velocity.x = 0;
// // 		} else {
// // 			displayObject.body.velocity.x = Math.cos(angle) * speed;
// // 			displayObject.body.velocity.y = Math.sin(angle) * speed;
// // 		}
// // 	}
// // 	*/
// // 	displayObject.body.velocity.x = Math.cos(angle) * speed;
// // 	displayObject.body.velocity.y = Math.sin(angle) * speed;

// // 	return angle;

// // }

// // function distanceToPointer (displayObject, pointer, world) {
// // 	if (world === undefined) { world = false; }

// // 	var dx = (world) ? displayObject.world.x - pointer.worldX : displayObject.x - pointer.worldX;
// // 	var dy = (world) ? displayObject.world.y - pointer.worldY : displayObject.y - pointer.worldY;

// // 	return Math.sqrt(dx * dx + dy * dy);
// // }

// // function angleToPointer (displayObject, pointer, world) {
// // 	if (world === undefined) world = false;
// // 	if (world) {
// // 		return Math.atan2(pointer.worldY - displayObject.world.y, pointer.worldX - displayObject.world.x);
// // 	}
// // 	else {
// // 		return Math.atan2(pointer.worldY - displayObject.y, pointer.worldX - displayObject.x);
// // 	}
// // }
