// // var GoldenGame = GoldenGame || {};

// GoldenGame.Level4 = function(game){
//   console.log('GAME:', game)
//   this.game = game;
//   this._levelN = 4;
// };

// let player4, cursors4, stage4, ground4, prevCamX4 = 0;
// GoldenGame.Level4.prototype = {
// 	preload: function() {
// 		//game.stage4.disableVisibilityChange = true;
//     this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//     this.game.world.setBounds(0, 0, 800*5, canvasHeight)
//     },

//   create: function () {
//     // this.game.physics.startSystem(Phaser.Physics.ARCADE);
//     stage4 = this.game.add.sprite(0, -100, 'stage4');
//     stage4.scale.setTo(4, 2)
//     stage4.enableBody = true;
//     //stage4.body.immovable = true;


//     ground4 = this.game.add.group()
//     //  We will enable physics for any object that is created in this group
//     ground4.enableBody = true;

//     let turf = ground4.create(0, this.game.world.height - 40, 'ground1')
//     turf.scale.setTo(2.7, 1.4);
//     //This stops it from falling away when you jump on it
//     turf.body.immovable = true;

//     stage4.debug = true;
//     ground4.debug = true;
//     turf.debug = true;
// 		// stage4.resizeWorld();
//     stage4.wrap = true;


//     //The player4 and its settings
//     player4 = this.game.add.sprite(0, this.game.world.height - 150, 'centaur');

//     //  We need to enable physics on the player4
//     this.game.physics.arcade.enable(player4);

//     //  Player4 physics properties. Give the little guy a slight bounce.
//     player4.body.bounce.y = 0.2;
//     player4.body.gravity.y = 500;
//     player4.body.collideWorldBounds = true;

//     player4.anchor.x = 0.5
//     //  Our animations...
//     player4.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

//     this.game.camera.follow(player4, Phaser.Camera.FOLLOW_LOCKON, 0.1)
//     prevCamX4 = this.game.camera.x

//   },

//   update: function () {
//     this.game.physics.arcade.collide(player4, stage3);
//     prevCamX4 = this.game.camera.x

//     // emit the player4 input
//     cursors4 = this.game.input.keyboard.createCursorKeys();
//     player4.body.velocity.x = 0;

//     if (cursors4.up.isDown) {
//       if (player4.body.onFloor()) player4.body.velocity.y = -220;
//     }
//     if (cursors4.left.isDown) {
//       player4.animations.play('right');
//       player4.body.velocity.x = -50;
//       player4.x -= 5;
//       player4.scale.x = -1;
//       // player4.animations.play('left');
//     } else if (cursors4.right.isDown) {
//       player4.animations.play('right');
//       // this.game.camera.x += 4;
//       player4.body.velocity.x = 350;
//       player4.x += 5;
//       player4.scale.x = 1;
//     } else {
//       player4.animations.stop();
//       player4.frame = 4;
//     }

//   },

//   render: function() {
//     this.game.debug.body(player4)
//     this.game.debug.bodyInfo(player4, 32, 320)
//   }
// }
