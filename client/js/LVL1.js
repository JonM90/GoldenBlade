// // var GoldenGame = GoldenGame || {};
// // GoldenGame.Level1 = {};
// // The game function at line 5 will be our level 1 state and as usual, we’ll have the preload,
// //create and update functions that is used by the Phaser framework.
// GoldenGame.Level1 = function(game) {
//   this.groups = {};// this.game = game;
// };
// let turf;//, evil;// timer, self, cursors, player1, stage1, prevCamX1 = 0;

// GoldenGame.Level1.prototype = {
//   initGroups: function() {
//     for (let k in GoldenGame.gameProperties.groups) {
//       if (GoldenGame.gameProperties.groups.hasOwnProperty(k)) {
//         let groupName = GoldenGame.gameProperties.groups[k];
//         this.groups[groupName] = this.game.add.group(undefined, groupName);
//         this.groups[groupName].enableBody = true;
//         this.groups[groupName].physicsBodyType = Phaser.Physics.ARCADE;
//       }
//     }
//   },
//   initControls: function() {
//     this.attackButton = Phaser.KeyCode.D;
//     this.jumpBtn = Phaser.KeyCode.SPACEBAR;
//     this.leftBtn = Phaser.KeyCode.LEFT;
//     this.rightBtn = Phaser.KeyCode.RIGHT;
//     GoldenGame.controls.add(GoldenGame.controls.UP, this.jumpBtn, this.player1.state.jump);
//     GoldenGame.controls.add(GoldenGame.controls.LEFT, this.leftBtn, this.player1.state.moveLeft);
//     GoldenGame.controls.add(GoldenGame.controls.RIGHT, this.rightBtn, this.player1.state.moveRight);
//     GoldenGame.controls.add(GoldenGame.controls.ATTACK, this.attackButton, this.player1.state.attack);
//     GoldenGame.controls.add(GoldenGame.controls.IDLE, null, this.player1.state.idle);
//   },
// 	preload: function() {
//     this.handleCollide = this.handleCollide.bind(this);
//     this.utils = Object.assign({}, GoldenGame.character.utils);
//     //game.stage1.disableVisibilityChange = true;
//     // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     // this.scale.pageAlignHorizontally = true;
//     this.scale.pageAlignVertically = true;
//     // this.scale.setScreenSize( true );
//     this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
//     // this.game.world.setBounds(50, 50, 800 * 5, canvasHeight);
//     this.game.world.setBounds(50, 0, 800 * 5, canvasHeight);
//   },
//   createEnemy: function(enemyType) {
//     console.log('creating enemyType:', enemyType)
//     let group = this.groups[enemyType];
//     let enemy = group.create(Math.floor(Math.random() + canvasWidth), this.game.world.height - 150, enemyType)
//     enemy.state = Object.create(GoldenGame.character.State);
//     enemy.state.init(enemy, GoldenGame.character[enemyType]);
//     enemy.anchor.setTo(0.5, 0.5);
//     enemy.body.gravity.y = 600;
//     enemy.body.collideWorldBounds = true;
//     // enemy.body.bounce.setTo(1, 0.2);
//     enemy.body.bounce.x = 1;
//     // enemy.body.immovable = true;
//     this.enemiesInGame.push(enemy);
//     return enemy;
//   },
//   handleCollide: function(player, enemy) {
//     // console.log('handling collision!', 'this.game.isAttacking:', this.game.isAttacking)
//     player.damage(0.2);
//     player.body.x -= 25;
//     if (this.game && this.game.isAttacking) {
//       // console.log('attacking enemy')
//       if (this.player1._frame.index === 23) {
//         this.slash.play()
//         this.score += 20;
//         enemy.body.x > player.body.x ? enemy.body.x += 150 : enemy.body.x -= 150;
//         enemy.damage(25);
//         this.scoreText.text = `XP: ${this.score}`;
//       }
//     }
//     if (enemy.health < 10) {
//       enemy.children[1].animations.play('bursting', 10, false, true)
//     } else if (enemy.health < 90) {
//       // console.log('bleed:', enemy.children[0])
//       enemy.children[0].animations.play('bleed', 4, true);
//     }
//     if (player.health < 50) {
//       player.health = 100;
//       // player.children[0].animations.play('bleed')
//     }
//   },
//   animateActions: function() {
//     // console.log('util:', this.utils)
//     this.enemiesInGame.forEach(enemy => {
//       for (let actionType in this.utils.frames) {
//         if (this.utils.frames.hasOwnProperty(actionType)) {
//           let action = actionType+'ing';
//           let graphics = this.game.add.sprite(enemy.body.center.x, enemy.body.center.y, actionType);
//           graphics.scale.setTo(5, 5)
//           graphics.animations.add(action, this.utils.frames[actionType], 10, true);
//           enemy.addChild(graphics);
//         }
//       }
//     })
//   },
//   generateRnd: function() {
//     if (this.enemiesInGame.length < 1) {
//       let types = ['beelzebub', 'glob', 'wolf'];
//       this.createEnemy(types[(Math.floor(Math.random() * 3))])
//       console.log('created enemy!')
//     }
//   },
//   create: function () {
//     this.timer = this.game.time.create(this.game);
//     this.timer.add(this.delay, this.readyForAction, this);

//     this.stage1 = this.game.add.sprite(0, 0, 'stage1');
//     this.stage1.scale.setTo(1.6, 2.2)
//     this.stage1.wrap = true;
//     this.score = 0;
//     this.scoreText = this.game.add.text(55, 15, `XP: ${this.score}`, { fontSize: '40px', fill: '#000' });
//     this.scoreText.fixedToCamera = true;
//     this.timeScore = this.game.add.text(700, 15, `Time: ${0}`, { fontSize: '40px', fill: '#000' });
//     this.timeScore.fixedToCamera = true;
//     this.slash = this.game.add.audio('sword');
//     this.theme = this.game.add.audio('theme');
//     // this.game.sound.setDecodedCallback([ explosion, sword, blaster ], start, this);
//     this.enemiesInGame = [];
//     this.enemiesInRange = [];
//     this.sightRange = 600
//     this.initGroups();

//     this.ground = this.game.add.group()
//     // Enable physics for any object that is created in this group
//     this.ground.enableBody = true;
//     turf = this.ground.create(0, this.game.world.height - 5, 'ground1')
//     turf.scale.setTo(2.7, 3);
//     turf.body.immovable = true;

// 		// this.stage1.resizeWorld();
//     // this.initGameObjects();

//     this.player1 = this.groups.knight.create(50, this.game.world.height - 150, 'knight')
//     this.player1.state = Object.create(GoldenGame.character.State);
//     this.player1.state.init(this.player1, GoldenGame.character.knight);
//     this.game.physics.arcade.enable(this.player1);
//     this.player1.anchor.setTo(0.5, 0.5);

//     this.player1.body.bounce.y = 0.2;
//     this.player1.body.gravity.y = 500;
//     this.player1.body.collideWorldBounds = true;
//     this.player1.body.immovable = true;

//     this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1)
//     this.prevCamX = this.game.camera.x
//     this.initControls();
//     this.animateActions();
//     this.theme.play()
//     this.timer.start();

//   },

//   update: function () {
//     this.timeScore.text = `Time: ${this.timer.elapsed}`;
//     GoldenGame.controls.update();
//     this.game.physics.arcade.collide(this.player1, this.ground);
//     this.game.physics.arcade.collide(this.player1, turf);
//     this.game.physics.arcade.collide(this.player1, this.groups.centaur, this.handleCollide);
//     this.game.physics.arcade.collide(this.player1, this.groups.glob, this.handleCollide);
//     this.game.physics.arcade.collide(this.player1, this.groups.wolf, this.handleCollide);
//     this.game.physics.arcade.collide(this.player1, this.groups.beelzebub, this.handleCollide);
//     this.prevCamX = this.game.camera.x
//     // this.player1.body.velocity.x = 0;
//     // this.player1.body.speed = 0;

//     for (let i = 0; i < this.enemiesInGame.length; i++) {
//       let enemy = this.enemiesInGame[i];
//       let distance = this.game.physics.arcade.distanceBetween(this.player1, enemy)
//       if (distance < this.sightRange) {
//         this.game.physics.arcade.moveToObject(enemy, this.player1, 120);
//         if (enemy.body.x === this.player1.body.x) {
//           enemy.body.velocity.x = 0;
//           enemy.body.accleration.x = 0;
//         }
//         else if (distance < enemy.atkRng) enemy.animations.play('attack');
//         else {
//           enemy.animations.play('move');
//           if (enemy.body.center.x > this.player1.body.center.x) {enemy.scale.x = -1}
//           else {enemy.scale.x = 1}
//           if (!this.enemiesInRange.includes(enemy)) this.enemiesInRange.push(enemy);
//         }
//       }
//     }

//     if (this.player1.world.x >= 2750) this.game.state.start('Level2');
//   },

//   render: function() {
//     this.game.debug.body(this.player1)
//     this.game.debug.bodyInfo(this.player1, 32, 320)
//     this.game.debug.text(`ENEMIES in RANGE: ${this.enemiesInRange.length}`, 450, 25);
//     // this.game.debug.text(`My center x: ${this.player1.body.center.x}`, 450, 55);
//     // this.game.debug.text(`My BODY x: ${this.player1.body.x}`, 450, 75);
//     this.game.debug.text(`HP: ${this.player1.health}`, 450, 105);
//     // this.game.debug.text(`Time: ${this.timer.elapsed}`, 450, 55);
//     // this.game.debug.text(`Evil health: ${evil.health}`, 450, 125);
//     // this.game.debug.spriteInfo(evil, 20, 100);
//     // this.game.debug.text(`Glob health: ${blob.health}`, 450, 145);
//     // this.game.debug.spriteInfo(blob, 20, 130);
//     // this.game.debug.text(`Evil velocity: ${evil.body.velocity.x}`, 20, 220);
//     // this.game.debug.text(`Evil acceleration: ${evil.body.acceleration.x}`, 20, 250);
//     // this.game.debug.text(`player1 currFrameIndex: ${this.player1._frame.index}`, 450, 165);
//   }
// }





var GoldenGame = GoldenGame || {};
GoldenGame.Level1 = function(game) {
  // this.game = game;
  this.groups = {};
};
//let turf;//, evil;// timer, self, cursors, player1, stage1, prevCamX1 = 0;
// var hitPlatform;
GoldenGame.Level1.prototype = {
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
    //game.stage1.disableVisibilityChange = true;
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.pageAlignHorizontally = true;
    // this.scale.setScreenSize( true );
    // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignVertically = true;
    this.game.world.setBounds(0, 0, 800 * 5, this.game.height);
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
    player.body.x -= 5;
    if (this.game && this.game.isAttacking) {
      if (this.player1._frame.index === 23) {
        this.slash.play()
        this.score += 25;
        enemy.body.x > player.body.x ? enemy.body.x += 200 : enemy.body.x -= 200;
        enemy.damage(150);
        this.scoreText.text = `XP: ${this.score}`;
      }
    }
    // if (enemy.health < 10) {
    //   // enemy.children[1].animations.play('bursting', 10, false, true)
    // } else if (enemy.health < 90) {
    //   // console.log('bleed:', enemy.children[0])
    //   // enemy.children[0].animations.play('bleed', 4, true);
    // }
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
  // generateRnd: function() {
  //   if (this.enemiesInGame.length < 1) {
  //     let types = ['beelzebub', 'glob', 'wolf', 'centaur'];
  //     this.createEnemy(types[(Math.floor(Math.random() * 3))])
  //     console.log('created enemies!')
  //   }
  // },
  create: function () {
    this.timer = this.game.time.create(this.game);
    this.stage1 = this.game.add.sprite(50, -30, 'stage1');
    this.stage1.height = this.game.height * 1.10;
    this.stage1.width = 4000;
    // this.stage1.resizeWorld();
    this.stage1.wrap = true;
    this.score = 0;
    this.scoreText = this.game.add.text(55, 15, `XP: ${this.score}`, { fontSize: '40px', fill: '#fff' });
    this.scoreText.fixedToCamera = true;
    this.timeScore = this.game.add.text(750, 15, `Timer: ${0}`, { fontSize: '40px', fill: '#fff' });
    this.timeScore.fixedToCamera = true;
    this.slash = this.game.add.audio('sword');
    this.theme = this.game.add.audio('theme');
    // this.game.sound.setDecodedCallback([ explosion, sword, blaster ], start, this);
    this.enemiesInGame = [];
    this.enemiesInRange = [];
    this.sightRange = 600
    this.initGroups();

    this.ground = this.game.add.group()
    // Enable physics for any object that is created in this group
    this.ground.enableBody = true;
    let turf = this.ground.create(0, this.game.world.height - 75, 'ground1')
    turf.width = 4000;
    turf.body.immovable = true;
    // turf.alpha = 0;

    let types = ['beelzebub', 'glob', 'wolf', 'centaur'];
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 700, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 800, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1100, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1400, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 1700, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2000, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2300, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2600, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 2900, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 3200, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 3500, 400)
    this.createEnemy(types[(Math.floor(Math.random() * 3))], 3800, 400)
    // this.createEnemy(types[(Math.floor(Math.random() * 3))], , y)
    this.animateActions();

    this.player1 = this.groups.knight.create(50, this.game.world.height - 150, 'knight')
    // this.game.physics.arcade.enable(this.player1);
    this.player1.enableBody = true;
    this.player1.state = Object.create(GoldenGame.character.State);
    this.player1.state.init(this.player1, GoldenGame.character.knight);
    this.player1.anchor.setTo(0.5, 0.5);
    this.player1.body.bounce.y = 0.2;
    this.player1.body.gravity.y = 400;
    this.player1.body.collideWorldBounds = true;
    // this.player1.body.immovable = true;

    this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1)
    this.prevCamX = this.game.camera.x
    this.initControls();
    this.theme.play()
    this.timer.start();
  },

  update: function () {
    GoldenGame.controls.update();
    this.timeScore.text = `Timer: ${this.timer.seconds.toFixed(2)}`;
    GoldenGame.hitPlatform = this.game.physics.arcade.collide([this.player1, this.groups.centaur, this.groups.glob, this.groups.wolf, this.groups.beelzebub], this.ground);
    this.game.physics.arcade.collide(this.player1, [this.groups.centaur, this.groups.glob, this.groups.wolf, this.groups.beelzebub], this.handleCollide);
    this.prevCamX = this.game.camera.x
    // this.game.physics.arcade.collide(this.player1, turf);
    // this.game.physics.arcade.collide(this.player1, this.groups.centaur, this.handleCollide);
    // this.game.physics.arcade.collide(this.player1, this.groups.glob, this.handleCollide);
    // this.game.physics.arcade.collide(this.player1, this.groups.wolf, this.handleCollide);
    // this.game.physics.arcade.collide(this.player1, this.groups.beelzebub, this.handleCollide);
    // this.player1.body.velocity.x = 0;
    // this.player1.body.speed = 0;
    for (let i = 0; i < this.enemiesInGame.length; i++) {
      let enemy = this.enemiesInGame[i];
      let distance = this.game.physics.arcade.distanceBetween(this.player1, enemy)
      if (distance < this.sightRange) {
        this.game.physics.arcade.moveToObject(enemy, this.player1, 120);
        // if (enemy.body.x === this.player1.body.x) {
        //   enemy.body.velocity.x = 0;
        //   enemy.body.accleration.x = 0;
        // }
        //else
        if (distance < enemy.atkRng) enemy.animations.play('attack');
        else {
          enemy.animations.play('move');
          if (enemy.body.center.x > this.player1.body.center.x) {enemy.scale.x = -1}
          else {enemy.scale.x = 1}
          if (!this.enemiesInRange.includes(enemy)) this.enemiesInRange.push(enemy);
        }
      }
    }

    if (this.player1.world.x >= 2750) this.game.state.start('Level2');
  },

  render: function() {
    this.game.debug.body(this.player1)
    this.game.debug.bodyInfo(this.player1, 32, 320)
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
