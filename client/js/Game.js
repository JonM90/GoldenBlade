// //var GoldenGame = GoldenGame || {};

// // GoldenGame.Game = function(game){
// //   console.log('GAME:', game)
// //   this.game = game;
// //   this._levelN = 0;
// // };

// // GoldenGame.Game = {};

// GoldenGame.Game = function(game) {
//   this.groups = {};
// };
// var player, cursors;//, prevCamX = 0;

// initGameObjects: function() {
//   // var i, gameObject, asset;
//   // for (i=0;i<this.mapData.objects.gameObjects.length; i++) {
//   //   gameObject = this.mapData.objects.gameObjects[i];
//   //   asset = GoldenGame.level1.assets[gameObject.name];
//   //   this.mapData.createFromObjects('gameObjects', gameObject.gid, asset.name, 0, true, false, this.groups[gameObject.properties.group]);
//   // }

//   // this.player1 = this.groups.groupType.create(0, this.game.world.height - 150, groupType)
//   // this.player1.state = Object.create(GoldenGame.character.State);
//   // console.log('this.player1:', this.player1, 'this.groups:', this.groups)
//   // this.player1.state.init(this.player1, GoldenGame.character.Centaur);
// },

// GoldenGame.Game.prototype = {
//   // initGroups: function() {
//   //   let groupName;
//   //   for (let k in Platformer.gameProperties.groups) {
//   //     groupName = Platformer.gameProperties.groups[k];
//   //     this.groups[groupName] = this.game.add.group(undefined, groupName);
//   //     this.groups[groupName].enableBody = true;
//   //     this.groups[groupName].physicsBodyType = Phaser.Physics.ARCADE;
//   //   }
//   // },
// 	preload: function() {
// 		//game.stage1.disableVisibilityChange = true;
//     this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//     this.game.world.setBounds(0, 0, 800*5, canvasHeight)
//     },

//   create: function () {
//     // // this.game.physics.startSystem(Phaser.Physics.ARCADE);
//     // stage1 = this.game.add.sprite(0, 0, 'stage1');
//     // stage1.scale.setTo(1.6, 2.2)
//     // stage1.enableBody = true;
//     // //stage1.body.immovable = true;

//     // ground = this.game.add.group()
//     // //  We will enable physics for any object that is created in this group
//     // ground.enableBody = true;

//     // let turf = ground.create(0, this.game.world.height - 40, 'ground1')
//     // turf.scale.setTo(2.7, 1.4);
//     // //This stops it from falling away when you jump on it
//     // turf.body.immovable = true;

//     // stage1.debug = true;
//     // ground.debug = true;
//     // turf.debug = true;
// 		// // stage1.resizeWorld();
//     // stage1.wrap = true;

//     // The player and its settings
//     player = this.game.add.sprite(300, this.game.world.height - 150, 'centaur');

//     //  We need to enable physics on the player
//     this.game.physics.arcade.enable(player);

//     //  Player physics properties. Give the little guy a slight bounce.
//     player.body.bounce.y = 0.2;
//     player.body.gravity.y = 500;
//     player.body.collideWorldBounds = true;

//     player.anchor.x = 0.5
//     //  Our animations...
//     player.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

//     this.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1)
//     // prevCamX = this.game.camera.x
//   },

//   update: function () {
//     // this.game.physics.arcade.collide(player, stage1);

//     // emit the player input
//     // cursors = this.game.input.keyboard.createCursorKeys();
//     // player.body.velocity.x = 0;
//     // prevCamX = this.game.camera.x

//     // if (cursors.up.isDown) {
//     //   if (player.body.onFloor()) player.body.velocity.y = -220;
//     // }
//     // if (cursors.left.isDown) {
//     //   player.animations.play('right');
//     //   player.body.velocity.x = -50;
//     //   player.x -= 5;
//     //   player.scale.x = -1;
//     //   // player.animations.play('left');
//     // } else if (cursors.right.isDown) {
//     //   player.animations.play('right');
//     //   // this.game.camera.x += 2;
//     //   player.body.velocity.x = 250;
//     //   player.x += 5;
//     //   player.scale.x = 1;
//     // } else {
//     //   player.animations.stop();
//     //   player.frame = 4;
//     // }
//     // if (cursors.up.isDown) {
//     // 	// this.game.camera.y -= 2;
//     // 	player.body.velocity.y = -250;
//     // 	// player.animations.play('up');
//     // } else if (cursors.down.isDown) {
//     // 	// this.game.camera.y += 2;
//     // 	player.body.velocity.y = 250;
//     // 	// player.animations.play('down');
//     // }
//     //  Allow the player to jump if they are touching the ground.
//     // if (cursors.up.isDown && player.body.touching.down) {
//     // 	player.body.velocity.y = -350;
//     // }

//     // if (cursors.up.isDown) {
//     // 	if (player.body.onFloor()) player.body.velocity.y = -200;
//     // }

//     // this.game.state.start('Level1');
//   },

//   render: function() {
//     this.game.debug.body(player)
//     this.game.debug.bodyInfo(player, 32, 320)
//   }
// }

// GoldenGame.game = new Phaser.Game(GoldenGame.gameProperties.screenWidth, GoldenGame.gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
// GoldenGame.controls.registerGame(GoldenGame.game);








  // initGameObjects: function() {
  //   for (let k in this.groups) {
  //     if (this.groups.hasOwnProperty(k)) {
  //       // let group = this.groups[k];
  //       // this[k] = group.create(Math.floor(Math.random()*400), this.game.world.height - 150, k)
  //       // this[k].state = Object.create(GoldenGame.character.State);
  //       // this[k].state.init(this[k], GoldenGame.character[k]);
  //       // this[k].anchor.setTo(0.5, 0.5);
  //       // this[k].body.gravity.y = 600;
  //       // this[k].body.collideWorldBounds = true;
  //       // this.enemiesInGame.push(this[k])
  //     }
  //   }
  // },

  //   let self = this;
  // if (this.enemiesInRange.length)  {
  //   this.enemiesInRange.forEach( function(enemy) {
  //   let pX = self.player1.body.center.x
  //   let eX = enemy.body.center.x;
  //   // if ((this.game.physics.arcade.distanceBetween(this.player1, enemy)) > 600){
  //     if (eX === pX) { enemy.body.velocity.x = 0 }
  //     else {
  //       if (eX > pX) { eX -= 2 }
  //       if (eX < pX) { eX += 2 }
  //       // if (enemy.y > this.player1.y) { enemy.y -= 2 }
  //       // if (this.player1.y > enemy.y) { enemy.y += 2 }
  //     }
  // // } else{
  //   // enemy.setAll('body.velocity.x', -200);
  //   // enemy.setAll('body.velocity.y', 0);
  // // }
  //   });
  // }


// Phaser.Physics.Arcade.moveToObject(this.groups.centaur, this.player1, 120);
// this.game.physics.arcade.moveToXY(this.groups.centaur, this.player1.x, this.player1.y, this.groups.centaur.body.velocity.x);
// for (let i = 0; i < this.enemiesInGame.length; i++) {
//   let enemy = this.enemiesInGame[i];
//   let distanceToPlayerX = Math.abs(enemy.body.center.x - this.player1.body.center.x);
//   if (!this.enemiesInRange.includes(enemy) && distanceToPlayerX <= this.attackRange) this.enemiesInRange.push(enemy);
//   else this.enemiesInRange = [];
// }


    // let types = ['beelzebub', 'glob', 'wolf', 'centaur'];
    // let chosen = types[ (Math.floor(Math.random() * 3)) ]
    // this.timer = this.game.timer.add(this.game);
    // this.timer.add(this.delay, this.readyForAction, this);
    // this.timeEnemy = this.timer.add(5000, this.createEnemy, this, types[Math.floor(Math.random() * 3)]);
    // this.timeEnemy.loop = true;
    // this.timeEnemy.repeatCount = 10;















// //FROM LEVEL1
// // var GoldenGame = GoldenGame || {};
// // GoldenGame.Level1 = function(game){
// //   console.log('GAME:', game)
// //   console.log('LEVEL 1 PLAYER:', player)
// //   this.game = game;
// //   this._levelN = 1;
// // };

// // GoldenGame.Level1 = {};
// // console.log('hi from lvl 1:', 'GoldenGame.Game.groups', GoldenGame.Game.groups)

// // The game function at line 14 will be our level 1 state and as usual, we’ll have the preload,
// //create and update functions that is used by the Phaser framework.
// // GoldenGame.Level1 = {};
// // // GoldenGame.level1.assets = {};
// GoldenGame.Level1 = function(game) {
//   // this.game = game;
//   this.groups = {};
// };
// // GoldenGame.level1.game.prototype.preload = function () {

// // };
// // GoldenGame.level1.game.prototype.create = function () {

// // };
// // GoldenGame.level1.game.prototype.update = function () {

// // };
// //let cursors,
// //let player1,
// //let stage1,
// let ground1;//, prevCamX1 = 0;

// GoldenGame.Level1.prototype = {
//   initGroups: function() {
//     let groupName;

//     for (let k in GoldenGame.gameProperties.groups) {
//       groupName = GoldenGame.gameProperties.groups[k];
//       this.groups[groupName] = this.game.add.group(undefined, groupName);
//       console.log('InitGroups, groupName:', groupName, 'this.groups[groupName]', this.groups[groupName])
//       this.groups[groupName].enableBody = true;
//       this.groups[groupName].physicsBodyType = Phaser.Physics.ARCADE;
//     }
//   },
//   // initGameObjects: function() {
//     // var i, gameObject, asset;

//     // for (i=0;i<this.mapData.objects.gameObjects.length; i++) {
//     //   gameObject = this.mapData.objects.gameObjects[i];
//     //   asset = GoldenGame.level1.assets[gameObject.name];

//     //   this.mapData.createFromObjects('gameObjects', gameObject.gid, asset.name, 0, true, false, this.groups[gameObject.properties.group]);
//     // }
//     // this.player1 = this.groups[GoldenGame.gameProperties.groups.player];//.getAt(0);
//     // this.player1 = this.game.add.sprite(0, this.game.world.height - 150, 'centaur');
//     // this.player1 = this.groups.centaur.create(0, this.game.world.height - 150, 'centaur')
//     // this.player1.state = Object.create(GoldenGame.character.State);
//     // console.log('this.player1:', this.player1, 'this.groups:', this.groups)
//     // this.player1.state.init(this.player1, GoldenGame.character.Centaur);
//   // },
//   initControls: function() {
//     GoldenGame.controls.add(GoldenGame.controls.UP, Phaser.KeyCode.W, this.player1.state.jump);
//     GoldenGame.controls.add(GoldenGame.controls.LEFT, Phaser.KeyCode.A, this.player1.state.moveLeft);
//     GoldenGame.controls.add(GoldenGame.controls.RIGHT, Phaser.KeyCode.D, this.player1.state.moveRight);
//     GoldenGame.controls.add(GoldenGame.controls.IDLE, null, this.player1.state.idle);
//   },
// 	preload: function() {
//     //game.stage1.disableVisibilityChange = true;
//     this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//     this.game.world.setBounds(0, 0, 800*5, canvasHeight)
//     },

//   create: function () {
//     // this.game.physics.startSystem(Phaser.Physics.ARCADE);
//     // this.initGameObjects();

//     this.stage1 = this.game.add.sprite(0, 0, 'stage1');
//     this.stage1.scale.setTo(1.6, 2.2)
//     // this.stage1.enableBody = true;
//     //this.stage1.body.immovable = true;
//     this.initGroups();

//     ground1 = this.game.add.group()
//     //  We will enable physics for any object that is created in this group
//     ground1.enableBody = true;

//     let turf = ground1.create(0, this.game.world.height - 40, 'ground1')
//     turf.scale.setTo(2.7, 1.4);

//     //This stops it from falling away when you jump on it
//     turf.body.immovable = true;

//     this.stage1.debug = true;
//     ground1.debug = true;
//     turf.debug = true;
// 		// this.stage1.resizeWorld();
//     // this.stage1.wrap = true;


//     this.player1 = this.groups.centaur.create(200, this.game.world.height - 150, 'centaur')
//     this.player1.state = Object.create(GoldenGame.character.State);
//     console.log('Created this.player1:', this.player1, 'this.groups:', this.groups)
//     this.player1.state.init(this.player1, GoldenGame.character.Centaur);


//     this.player1.body.bounce.y = 0.2;
//     this.player1.body.collideWorldBounds = true;
//     // this.player1.body.gravity.y = 300;
//     // // The player1 and its settings
//     // player1 = this.game.add.sprite(300, this.game.world.height - 150, 'centaur');

//     // player1 = GoldenGame.Preload.groups.hero
//     // console.log('LEVEL 1:', 'HERO', GoldenGame.Preload.groups.hero)
//     //'...GoldenGame.Game.groups', GoldenGame.Game.groups)


//     // //  We need to enable physics on the player1
//     // this.game.physics.arcade.enable(player1);

//     // //  Player1 physics properties. Give the little guy a slight bounce.
//     // player1.body.bounce.y = 0.2;
//     // player1.body.gravity.y = 500;
//     this.player1.body.collideWorldBounds = true;

//     this.player1.anchor.x = 0.5
//     // //  Our animations...
//     // player1.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

//     this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1)
//     this.prevCamX = this.game.camera.x
//     this.initControls();

//   },

//   update: function () {
//     // this.game.physics.arcade.collide(player, stage1);

//     // // emit the player1 input
//     // cursors = this.game.input.keyboard.createCursorKeys();
//     // player1.body.velocity.x = 0;
//     this.prevCamX = this.game.camera.x
//     this.player1.body.velocity.x = 0;
//     this.player1.body.velocity.y = 0;
//     // this.player1.body.acceleration.x = 0;
//     // this.player1.body.acceleration.y = 0;


//     // if (cursors.up.isDown) {
//     //   if (player1.body.onFloor()) player1.body.velocity.y = -220;
//     // }
//     // if (cursors.left.isDown) {
//     //   player1.animations.play('right');
//     //   player1.body.velocity.x = -50;
//     //   player1.x -= 5;
//     //   player1.scale.x = -1;
//     //   // player1.animations.play('left');
//     // } else if (cursors.right.isDown) {
//     //   player1.animations.play('right');
//     //   // this.game.camera.x += 2;
//     //   player1.body.velocity.x = 250;
//     //   player1.x += 5;
//     //   player1.scale.x = 1;
//     // } else {
//     //   player1.animations.stop();
//     //   player1.frame = 4;
//     // }

//     // if (cursors.up.isDown) {
//     // 	// this.game.camera.y -= 2;
//     // 	player1.body.velocity.y = -250;
//     // 	// player1.animations.play('up');
//     // } else if (cursors.down.isDown) {
//     // 	// this.game.camera.y += 2;
//     // 	player1.body.velocity.y = 250;
//     // 	// player1.animations.play('down');
//     // }
//     //  Allow the player1 to jump if they are touching the ground.
//     // if (cursors.up.isDown && player1.body.touching.down) {
//     // 	player1.body.velocity.y = -350;
//     // }

//     // if (cursors.up.isDown) {
//     // 	if (player1.body.onFloor()) player1.body.velocity.y = -200;
//     // }

//     // if (player.world.x >= 2650) {
//     //   this.game.state.start('Level2');
//     // }
//     // this.game.physics.arcade.collide(this.player, stage1);

//     GoldenGame.controls.update();
//   },

//   render: function() {
//     this.game.debug.body(this.player1)
//     this.game.debug.bodyInfo(this.player1, 32, 320)
//   }
// }
