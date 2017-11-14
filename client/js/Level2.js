// // var GoldenGame = GoldenGame || {};
// GoldenGame.Level2 = function(game){
//   // console.log('GAME:', game)
//   this.game = game;
//   this._levelN = 2;
// };

// let player2, cursors2, stage2, ground2, prevCamX2 = 0;
// GoldenGame.Level2.prototype = {
// 	preload: function() {
// 		//game.stage2.disableVisibilityChange = true;
//     this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//     this.game.world.setBounds(0, 0, 800*4, canvasHeight)
//     },

//   create: function () {
//     // this.game.physics.startSystem(Phaser.Physics.ARCADE);
//     stage2 = this.game.add.sprite(0, 0, 'stage2');
//     stage2.scale.setTo(4, 2.2)
//     stage2.enableBody = true;
//     //stage2.body.immovable = true;

//     ground2 = this.game.add.group()
//     //  We will enable physics for any object that is created in this group
//     ground2.enableBody = true;

//     let turf = ground2.create(0, this.game.world.height - 40, 'ground1')
//     turf.scale.setTo(2, 1.4);
//     //This stops it from falling away when you jump on it
//     turf.body.immovable = true;

//     stage2.debug = true;
//     ground2.debug = true;
//     turf.debug = true;
// 		// stage2.resizeWorld();
//     stage2.wrap = true;


//     //The player2 and its settings
//     player2 = this.game.add.sprite(0, this.game.world.height - 150, 'centaur');

//     //  We need to enable physics on the player2
//     this.game.physics.arcade.enable(player2);

//     //  Player2 physics properties. Give the little guy a slight bounce.
//     player2.body.bounce.y = 0.2;
//     // player2.body.gravity.y = 500;
//     player2.body.collideWorldBounds = true;

//     player2.anchor.x = 0.5
//     //  Our animations...
//     player2.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

//     this.game.camera.follow(player2, Phaser.Camera.FOLLOW_LOCKON, 0.1)
//     prevCamX2 = this.game.camera.x
//   },

//   update: function () {
//     this.game.physics.arcade.collide(player2, stage2);
//     prevCamX2 = this.game.camera.x

//     // emit the player2 input
//     cursors2 = this.game.input.keyboard.createCursorKeys();
//     player2.body.velocity.x = 0;

//     if (cursors2.up.isDown) {
//       if (player2.body.onFloor()) player2.body.velocity.y = -220;
//     }
//     if (cursors2.left.isDown) {
//       player2.animations.play('right');
//       player2.body.velocity.x = -50;
//       player2.x -= 5;
//       player2.scale.x = -1;
//       // player2.animations.play('left');
//     } else if (cursors2.right.isDown) {
//       player2.animations.play('right');
//       // this.game.camera.x += 2;
//       player2.body.velocity.x = 250;
//       player2.x += 5;
//       player2.scale.x = 1;
//     } else {
//       player2.animations.stop();
//       player2.frame = 4;
//     }
//     if (player2.world.x >= 2600) {
//       this.game.state.start('Level3');
//     }
//   },

//   render: function() {
//     this.game.debug.body(player2)
//     this.game.debug.bodyInfo(player2, 32, 320)
//   }
// }
var GoldenGame = GoldenGame || {};
GoldenGame.Level2 = function(game) {
  // this.game = game;
  this.groups = {};
};
GoldenGame.Level2.prototype = {
  initGroups: function() {
    for (let k in GoldenGame.gameProperties.groups) {
      if (GoldenGame.gameProperties.groups.hasOwnProperty(k)) {
        let groupName = GoldenGame.gameProperties.groups[k];
        this.groups[groupName] = this.game.add.group(undefined, groupName);
        this.groups[groupName].enableBody = true;
        this.groups[groupName].physicsBodyType = Phaser.Physics.ARCADE;
      }
    }
  },
  initControls: function() {
    this.attackButton = Phaser.KeyCode.SPACEBAR;
    this.jumpBtn = Phaser.KeyCode.UP;
    this.leftBtn = Phaser.KeyCode.LEFT;
    this.rightBtn = Phaser.KeyCode.RIGHT;
    // this.player1.state.jump = this.player1.state.jump.bind(this)
    GoldenGame.controls.add(GoldenGame.controls.UP, this.jumpBtn, this.player1.state.jump);
    GoldenGame.controls.add(GoldenGame.controls.LEFT, this.leftBtn, this.player1.state.moveLeft);
    GoldenGame.controls.add(GoldenGame.controls.RIGHT, this.rightBtn, this.player1.state.moveRight);
    GoldenGame.controls.add(GoldenGame.controls.ATTACK, this.attackButton, this.player1.state.attack);
    GoldenGame.controls.add(GoldenGame.controls.IDLE, null, this.player1.state.idle);
  },
	preload: function() {
    this.handleCollide = this.handleCollide.bind(this);
    this.utils = Object.assign({}, GoldenGame.character.utils);
    // this.game.stage2.disableVisibilityChange = true;
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.pageAlignHorizontally = true;
    // this.scale.setScreenSize( true );
    // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignVertically = true;
    this.game.world.setBounds(0, 0, 800 * 6, this.game.height);
  },
  createEnemy: function(enemyType, x, y) {
    console.log('creating enemyType:', enemyType)
    let group = this.groups[enemyType];
    let enemy = group.create(x, y, enemyType)
    enemy.state = Object.create(GoldenGame.character.State);
    enemy.state.init(enemy, GoldenGame.character[enemyType]);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.body.gravity.y = 600;
    enemy.body.collideWorldBounds = true;
    // enemy.body.bounce.setTo(1, 0.2);
    enemy.body.bounce.x = 1;
    // enemy.body.immovable = true;
    this.enemiesInGame.push(enemy);
    return enemy;
  },
  handleCollide: function(player, enemy) {
    player.damage(1);
    player.body.x -= 3;
    if (this.game && this.game.isAttacking) {
      if (this.player1._frame.index === 23) {
        this.slash.play()
        this.score += 25;
        enemy.body.x > player.body.x ? enemy.body.x += 200 : enemy.body.x -= 200;
        enemy.damage(150);
        this.scoreText.text = `XP: ${this.score}`;
      }
    }
    if (player.health < 50) {player.health = 100}
  },
  animateActions: function() {
    this.enemiesInGame.forEach(enemy => {
      for (let actionType in this.utils.frames) {
        if (this.utils.frames.hasOwnProperty(actionType)) {
          let action = actionType+'ing';
          let graphics = this.game.add.sprite(enemy.body.center.x, enemy.body.center.y, actionType);
          graphics.scale.setTo(5, 5)
          graphics.animations.add(action, this.utils.frames[actionType], 10, true);
          enemy.addChild(graphics);
        }
      }
    })
  },
  create: function () {
    console.log('old score!', GoldenGame.game.score);
    this.stage2 = this.game.add.sprite(0, -30, 'stage3');
    this.stage2.height = this.game.height;
    this.stage2.width = 4800;
    this.stage2.wrap = true;
    this.score = GoldenGame.game.score || 0;
    this.scoreText = this.game.add.text(55, 15, `XP: ${this.score}`, { fontSize: '40px', fill: '#fff' });
    // this.scoreText = GoldenGame.game.score
    this.scoreText.fixedToCamera = true;
    this.timer = this.game.time.create(this.game);
    this.timeScore = this.game.add.text(750, 15, `Timer: ${0}`, { fontSize: '40px', fill: '#fff' });
    this.timeScore.fixedToCamera = true;
    this.slash = this.game.add.audio('sword');
    // this.theme = this.game.add.audio('theme');
    // this.game.sound.setDecodedCallback([ explosion, sword, blaster ], start, this);
    this.enemiesInGame = [];
    this.enemiesInRange = [];
    this.sightRange = 600
    this.initGroups();

    this.ground = this.game.add.group()
    this.ground.enableBody = true;
    let turf = this.ground.create(0, this.game.world.height - 75, 'ground1')
    turf.width = 4800;
    turf.body.immovable = true;
    // turf.alpha = 0;

    let types = ['wolf', 'centaur', 'glob'];
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 700, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1000, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1300, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1600, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1900, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2200, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2500, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2800, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 3100, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 3400, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 3700, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 4000, 500)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 4300, 500)
    this.createEnemy('blade', 4500, 500)
    this.animateActions();

    this.player1 = this.groups.knight.create(50, this.game.world.height - 150, 'knight')
    this.game.physics.arcade.enable(this.player1);
    // this.player1.enableBody = true;
    this.player1.state = Object.create(GoldenGame.character.State);
    this.player1.state.init(this.player1, GoldenGame.character.knight);
    this.player1.anchor.setTo(0.5, 0.5);
    this.player1.body.bounce.y = 0.2;
    this.player1.body.gravity.y = 700;
    this.player1.body.collideWorldBounds = true;
    console.log('this.player1.body.maxVelocity.y', this.player1.body.maxVelocity.y)
    // this.player1.body.immovable = true;

    this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1)
    this.prevCamX = this.game.camera.x
    this.initControls();
    // this.theme.play()
    this.timer.start();
  },

  update: function () {
    GoldenGame.controls.update();
    this.timeScore.text = `Timer: ${this.timer.seconds.toFixed(2)}`;
    GoldenGame.hitPlatform = this.game.physics.arcade.collide([this.player1, this.groups.centaur, this.groups.wolf], this.ground);
    this.game.physics.arcade.collide(this.player1, [this.groups.centaur, this.groups.wolf], this.handleCollide);
    this.prevCamX = this.game.camera.x

    for (let i = 0; i < this.enemiesInGame.length; i++) {
      let enemy = this.enemiesInGame[i];
      let distance = this.game.physics.arcade.distanceBetween(this.player1, enemy)
      if (distance < this.sightRange) {
        this.game.physics.arcade.moveToObject(enemy, this.player1, 120);
        if (distance < enemy.atkRng) enemy.animations.play('attack');
        else {
          enemy.animations.play('move');
          enemy.body.center.x > this.player1.body.center.x ? enemy.scale.x = -1 : enemy.scale.x = 1
          if (!this.enemiesInRange.includes(enemy)) this.enemiesInRange.push(enemy);
        }
      }
    }
    if (this.player1.world.x >= 4799) this.game.state.start('Level3');
  },

  render: function() {
    // this.game.debug.body(this.player1)
    // this.game.debug.bodyInfo(this.player1, 32, 320)
    this.game.debug.text(`ENEMIES in RANGE: ${this.enemiesInRange.length}`, 390, 25);
    this.game.debug.text(`HP: ${this.player1.health}`, 390, 55);
    // this.game.debug.text(`My center x: ${this.player1.body.center.x}`, 450, 55);
    // this.game.debug.text(`My BODY x: ${this.player1.body.x}`, 450, 75);
    // this.game.debug.text(`Time: ${this.timer.elapsed}`, 450, 55);
    // this.game.debug.text(`Evil health: ${evil.health}`, 450, 125);
    // this.game.debug.spriteInfo(evil, 20, 100);
    // this.game.debug.text(`Glob health: ${blob.health}`, 450, 145);
    // this.game.debug.spriteInfo(blob, 20, 130);
    // this.game.debug.text(`Evil velocity: ${evil.body.velocity.x}`, 20, 220);
    // this.game.debug.text(`Evil acceleration: ${evil.body.acceleration.x}`, 20, 250);
    // this.game.debug.text(`player1 currFrameIndex: ${this.player1._frame.index}`, 450, 165);
  }
}
