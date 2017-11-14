var GoldenGame = GoldenGame || {};

//loading the game assets
GoldenGame.Preload = function(){};

GoldenGame.Preload.prototype = {
 preload: function() {
   //show logo in loading screen
  //  this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  //  this.splash.anchor.setTo(0.5);

  //  this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
  //  this.preloadBar.anchor.setTo(0.5);

  //  this.load.setPreloadSprite(this.preloadBar);

   //load game assets
  //  this.load.image('space', 'assets/images/space.png');
  this.load.image('space', '../assets/starfield.jpg');
  this.load.image('BG', '../assets/mainBG.png');
  this.load.image('2ndBG', '../assets/secondBG.png');
  this.load.image('levelOpen', '../resources/mass attacks/shinyball.png', 96, 400);
  this.load.image('levelLocked', '../resources/characters/wizball.png', 96, 400);
  this.load.bitmapFont('shortStack', '../resources/fonts/shortStack.png', 'resources/fonts/shortStack.xml')

  this.load.image('stage1', '../assets/Stage1.png');
  this.load.image('stage2', '../assets/Stage2.png');
  this.load.image('stage3', '../assets/Stage3.png');
  this.load.image('stage4', '../assets/Stage4.png');
  // this.load.image('stage5', '../assets/Stage5.png');
  this.load.image('ground1', '../assets/ground.png');
  this.load.audio('sword', '../assets/sword.mp3');
  this.load.audio('theme', '../assets/Theme.mp3');
  this.load.spritesheet('centaur', '../assets/Centaur.png', 333, 277);
  this.load.spritesheet('glob', '../assets/glob.png', 512, 512);
  this.load.spritesheet('wolf', '../assets/Wolf.png', 300, 300);
  this.load.spritesheet('beelzebub', '../assets/beelzebub.png', 320, 320);
  this.load.spritesheet('knight', '../assets/knight.png', 300, 150);
  this.load.spritesheet('bleed', '../assets/bloody.png', 88, 88);
  this.load.spritesheet('burst', '../assets/burst.png', 400, 400);
  this.load.spritesheet('blade', '../assets/blade-thrust.png', 550, 217);
  this.load.spritesheet('bladeThrust', '../assets/blade-walk.png', 233, 217);

  //  this.load.image('rock', 'assets/images/rock.png');
  //  this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
  //  this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
  //  this.load.audio('collect', 'assets/audio/collect.ogg');
  //  this.load.image('playerParticle', 'assets/images/player-particle.png');
  //  this.load.audio('explosion', 'assets/audio/explosion.ogg');
  },
  create: function() {
    this.state.start('MainMenu');
  }
};

