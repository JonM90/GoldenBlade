GoldenGame.PlayerSelect = function(game){
  this.game = game;
  this.holdIcons = [];
};

var PLAYER_DATA = null;

GoldenGame.PlayerSelect.prototype = {
  preload: function() {
    this.initProgress();
  },
  create: function() {
    this.game.stage.backgroundColor = 0x80a0ff;
    this.game.add.bitmapText(400, 24, 'shortStack', 'Select a Player:', 48);
    this.createLevelIcons();
    this.animateLevelIcons();
  },
  update: function() {},
  render: function() {},
  initProgress: function() {
    if (!PLAYER_DATA) {
      //ctr+shift+j or cmd+option+j => resources => local storage
      var str = window.localStorage.getItem('mygame_progress');
      console.log('data:', str)
      try {
        PLAYER_DATA = JSON.parse(str);
      } catch (e) {
        PLAYER_DATA = []; //for Errors
      }
      if (Object.prototype.toString.call(PLAYER_DATA) !== '[object Array]') {
        PLAYER_DATA = [];
      }
    }
  },

  createLevelIcons: function() {
    let levelN = 0;
    let type = ['knight', 'wolf', 'beelzebub', 'blade', 'centaur', 'glob'];
    for (var x = 0; x < 6; x++) {
      levelN += 1
      //check if array not yet inititalized
      if (typeof PLAYER_DATA[levelN - 1] !== 'number') {
        if (levelN === 1) {
          PLAYER_DATA[levelN - 1] = 0;
        } else {
          PLAYER_DATA[levelN - 1] = -1;
        }
      }
      //track progress
      let playData = PLAYER_DATA[levelN - 1]

      let isLocked = true;
      let stars = 0;

      //>= for testing purposes, revert to > when finished
      if (playData > -1) {
        isLocked = false;
        if (playData < 4) stars = playData;
      }
      //calc pos on screen
      let xPos = x * 200;
      let yPos = 200;

      this.holdIcons[levelN - 1] = this.createLevelIcon(xPos, yPos, levelN, isLocked, stars, type[x]);
      let backIcon = this.holdIcons[levelN - 1].getAt(0);

      backIcon.health = levelN;

      backIcon.inputEnabled = true;
      backIcon.events.onInputDown.add(this.onSpriteDown, this);
    }
  },

  createLevelIcon: function(xPos, yPos, levelN, isLocked, stars, type) {
    // let n = levelN;
    // let types = ['wolf', 'beelzebub', 'centaur', 'blade', 'glob'];
    let iconGroup = this.game.add.group();
    iconGroup.x = xPos;
    iconGroup.y = yPos;

    iconGroup.xOrg = xPos;
    iconGroup.yOrg = yPos;
    // var frame = 0;
    // if (isLocked === false) frame = 1;
    if (isLocked === false) {
      console.log('levelN:', levelN)
      // let txt = this.game.add.bitmapText(20, 16, 'shortStack', 'Level: 1', 48);
      let open = this.game.add.sprite(-50, 20, 'knight');
      // open.scale.setTo(2.75, 2.75)

      // iconGroup.add(txt);
      iconGroup.add(open);
    } else {
      // let char = types.shift()
      if (type === 'wolf') iconGroup.add(this.game.add.sprite(-100, -30, type));
      if (type === 'beelzebub') iconGroup.add(this.game.add.sprite(-125, -80, type));
      if (type === 'blade') iconGroup.add(this.game.add.sprite(-120, -20, type));
      if (type === 'centaur') iconGroup.add(this.game.add.sprite(-140, -10, type));
      if (type === 'glob') iconGroup.add(this.game.add.sprite(-100, -210, type));
    }

    return iconGroup;
  },

  onSpriteDown: function(sprite, pointer) {
    let levelN = sprite.health;
    //let tween for testing, revert to individual tweens?
    // let tween;

    if (PLAYER_DATA[levelN - 1] < 0) {
      let iconGroup = this.holdIcons[levelN - 1];
      let xPos = iconGroup.xOrg;

      let tween = this.game.add.tween(iconGroup)
      .to({x: xPos+6}, 20, Phaser.Easing.Linear.None)
      .to({x: xPos-5}, 20, Phaser.Easing.Linear.None)
      .to({x: xPos+4}, 20, Phaser.Easing.Linear.None)
      .to({x: xPos-3}, 20, Phaser.Easing.Linear.None)
      .to({x: xPos+2}, 20, Phaser.Easing.Linear.None)
      .to({x: xPos-1}, 20, Phaser.Easing.Linear.None)
      .to({x: xPos}, 20, Phaser.Easing.Linear.None)
      .start();
    } else {
      let iconGroup = this.holdIcons[levelN - 1];
      let tween = this.game.add.tween(iconGroup.scale)
      .to({x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
      .to({x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
      .start();

      tween.onComplete.add(function() {this.onPlayerSelected(sprite.health)}, this)
    }
    //Outside of else for testing, revert to inside
  },

  animateLevelIcons: function() {
    for (let i = 0; i < this.holdIcons.length; i++) {
      let iconGroup = this.holdIcons[i];
      iconGroup.y = iconGroup.y + 600;
      let y = iconGroup.y;

      this.game.add.tween(iconGroup).to({y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40))
    }
  },

  onPlayerSelected: function(levelN) {
    // this.game.state.start('Game');
    console.log('LEVEL:', levelN)
    // this.game.state.start(`Level${levelN}`);
    this.game.state.start('LevelSelect');
  }
}
