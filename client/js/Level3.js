// var GoldenGame = GoldenGame || {};

GoldenGame.Level3 = function(game){
  console.log('GAME:', game)
  this.game = game;
  this._levelN = 3;
};

let player3, cursors3, ground3, prevCamX3 = 0;
GoldenGame.Level3.prototype = {
	preload: function() {
		//game.stage3.disableVisibilityChange = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.world.setBounds(0, 0, 800*6, this.game.height)
    },

  create: function () {
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.stage3 = this.game.add.sprite(0, 0, 'stage2');
    this.stage3.width = 4800;
    this.stage3.height = this.game.height * 2;
    // stage3.scale.setTo(3, 2.2)
    this.stage3.enableBody = true;
    //stage3.body.immovable = true;


    ground3 = this.game.add.group()
    //  We will enable physics for any object that is created in this group
    ground3.enableBody = true;

    let turf = ground3.create(0, this.game.world.height - 40, 'ground1')
    turf.body.immovable = true;
    turf.width = 4000;
    // turf.alpha = 0;
    // turf.scale.setTo(2.7, 1.4);
    // turf.scale.setTo(2.7, 1.4);
    //This stops it from falling away when you jump on it
    turf.body.immovable = true;

    // stage3.debug = true;
    // ground3.debug = true;
    // turf.debug = true;
		// stage3.resizeWorld();
    // this.stage3.wrap = true;


    //The player3 and its settings
    player3 = this.game.add.sprite(0, this.game.world.height - 150, 'knight');

    //  We need to enable physics on the player3
    this.game.physics.arcade.enable(player3);

    //  Player3 physics properties. Give the little guy a slight bounce.
    player3.body.bounce.y = 0.2;
    player3.body.gravity.y = 500;
    player3.body.collideWorldBounds = true;

    player3.anchor.x = 0.5
    //  Our animations...
    player3.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

    this.game.camera.follow(player3, Phaser.Camera.FOLLOW_LOCKON, 0.1)
    prevCamX3 = this.game.camera.x

  },

  update: function () {
    this.game.physics.arcade.collide(player3, stage3);
    prevCamX3 = this.game.camera.x

    // emit the player3 input
    cursors3 = this.game.input.keyboard.createCursorKeys();
    player3.body.velocity.x = 0;

    if (cursors3.up.isDown) {
      if (player3.body.onFloor()) player3.body.velocity.y = -220;
    }
    if (cursors3.left.isDown) {
      player3.animations.play('right');
      player3.body.velocity.x = -50;
      player3.x -= 5;
      player3.scale.x = -1;
      // player3.animations.play('left');
    } else if (cursors3.right.isDown) {
      player3.animations.play('right');
      // this.game.camera.x += 3;
      player3.body.velocity.x = 350;
      player3.x += 5;
      player3.scale.x = 1;
    } else {
      player3.animations.stop();
      player3.frame = 4;
    }

    if (player3.world.x >= 3569) {
      this.game.state.start('Level4');
    }
  },

  render: function() {
    this.game.debug.body(player3)
    // this.game.debug.bodyInfo(player3, 32, 320)
  }
}

