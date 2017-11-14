GoldenGame.character = {};
// console.log('THIS:', this, 'GoldenGame:', GoldenGame)
GoldenGame.character.State = (function State() {
  var sprite, character,
  directions = {LEFT: 'left', RIGHT: 'right'},
  facing = directions.RIGHT;

  var publicAPI = {
    init: function (target, characterType) {
      // graphics = GoldenGame.character.utils;
      sprite = target;
      character = characterType;
      sprite.body.setSize(character.boundingBox.width, character.boundingBox.height, character.boundingBox.offsetX, character.boundingBox.offsetY);
      sprite.body.maxVelocity.x = character.maxVelocity;
      sprite.body.drag.x = character.drag;
      sprite.health = character.health;
      sprite.atkRng = character.atkRng;
      for (let k in character.frames) {
        if (character.frames.hasOwnProperty(k)) {
          sprite.animations.add(k, character.frames[k], 10, true);
        }
      }
      // for (let key in graphics.frames) {
      //   if (graphics.frames.hasOwnProperty(key)) {
      //     let birth = GoldenGame.game.add.sprite(sprite.body.center.x, sprite.body.center.y, key)
      //     console.log('ADDING BLOOD:', 'key:', key, 'graphics.frames[key]', graphics.frames[key], 'birth:', birth)
      //     sprite.addChild(birth);
      //     // birth.animations.add(key, graphics.frames[key], 10, true);
      //     //game.make.sprite(-50, -50, 'blood')
      //   }
      // }
    },
    moveLeft: function () {
      facing = directions.LEFT;
      sprite.scale.x = -1;
      sprite.animations.play('move') ? sprite.animations.play('move') : sprite.animations.play(facing);
      sprite.body.velocity.x = -250;
      sprite.body.acceleration.x = -character.acceleration;
      sprite.x -= 5;
    },
    moveRight: function () {
      facing = directions.RIGHT;
      sprite.scale.x = 1;
      sprite.animations.play('move') ? sprite.animations.play('move') : sprite.animations.play(facing);
      sprite.body.acceleration.x = character.acceleration;
      sprite.body.velocity.x = 250;
      sprite.x += 5;
    },
    jump: function () {
      // sprite.body.velocity.y = character.jumpVelocity;
      if (sprite.body.touching.down || GoldenGame.hitPlatform && sprite.body.y > 500) {
        sprite.body.velocity.y = character.jumpVelocity;
        // console.log('sprite.body.touching.down:', sprite.body.touching.down, 'sprite.body.onFloor():', sprite.body.onFloor(), 'this.hitPlatform:', GoldenGame.hitPlatform, 'sprite', sprite)
        // console.log('AVVVFCSEESV')
      }
    },
    idle: function () {
      // sprite.animations.stop();
      // sprite.animations.play('idle');
      sprite.body.acceleration.x = 0;
      GoldenGame.game.isAttacking = false;
    },
    attack: function() {
      sprite.animations.play('attack');
      GoldenGame.game.isAttacking = true;
    }
    // bleed: function() {
    //   // sprite.addChild()
    //   sprite.animations.play('bleed')
    // }
  };

  return publicAPI;
})();

GoldenGame.character.centaur = (function Centaur(){
  return {
    name: 'centaur',
    jumpVelocity: -250,
    acceleration: 100,
    maxVelocity: 100,
    drag: 300, //Slows character down when neither left nor right key is being pressed
    health: 200,
    atkRng: 200,

    frames: {
      attack: [0, 1, 2, 3, 4, 8, 8, 6, 7],
      move: [0, 1, 2, 3, 4, 5, 6, 7],
      idle: [6]
    },
    //the size and position of the sprite’s physics body
    boundingBox: {
      width: 285,
      height: 200,
      offsetX: 0,
      offsetY: 10,
    }
  }
})();

GoldenGame.character.glob = (function Glob(){
  return {
    name: 'glob',
    jumpVelocity: -150,
    acceleration: 100,
    maxVelocity: 100,
    drag: 200,
    health: 100,
    atkRng: 250,

    frames: {
      attack: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      move: [8, 9, 10, 11, 12, 13, 14, 15],
      idle: [11, 12, 13, 14, 15]
    },
    boundingBox: {
      width: 350,
      height: 335,
      offsetX: 40,
      offsetY: 85,
    }
  }
})();

GoldenGame.character.wolf = (function Wolf(){
  return {
    name: 'wolf',
    jumpVelocity: -200,
    acceleration: 100,
    maxVelocity: 100,
    drag: 200,
    health: 150,
    atkRng: 130,

    frames: {
      attack: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      idle: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      move: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    },
    boundingBox: {
      width: 200,
      height: 150,
      offsetX: 30,
      offsetY: 71,
    }
  }
})();

GoldenGame.character.beelzebub = (function Beelzebub(){
  return {
    name: 'beelzebub',
    jumpVelocity: -150,
    acceleration: 100,
    maxVelocity: 100,
    drag: 200,
    health: 50,
    atkRng: 150,

    frames: {
      move: [0, 1, 6, 7],
      attack: [2, 3, 4, 5, 6, 7, 0, 1],
      idle: [0, 1, 2, 3, 2, 1],
    },
    boundingBox: {
      width: 200,
      height: 250,
      offsetX: 15,
      offsetY: 50,
    }
  }
})();

GoldenGame.character.knight = (function Knight(){
  return {
    name: 'knight',
    jumpVelocity: -400,
    acceleration: 100,
    maxVelocity: 100,
    drag: 200,
    health: 300,
    atkRng: 300,

    frames: {
      move: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      attack: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
      idle: [35, 36, 37, 38, 39, 40, 41, 42, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    boundingBox: {
      width: 180,
      height: 100,
      offsetX: 10,
      offsetY: 40,
    }
  }
})();

GoldenGame.character.blade = (function Blade(){
  return {
    name: 'blade',
    jumpVelocity: -400,
    acceleration: 100,
    maxVelocity: 100,
    drag: 200,
    health: 300,
    atkRng: 300,

    frames: {
      move: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
      attack: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      // idle: [35, 36, 37, 38, 39, 40, 41, 42, 0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    boundingBox: {
      width: 250,
      height: 200,
      offsetX: 0,
      offsetY: 10,
    }
  }
})();

GoldenGame.character.utils = (function utils(){
  return {
    name: 'utils',
    frames: {
      bleed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      burst: [0, 1, 2, 3, 4, 5, 6, 7]
    },
    boundingBox: {
      width: 350,
      height: 335,
      offsetX: 40,
      offsetY: 85,
    }
  }
})();
