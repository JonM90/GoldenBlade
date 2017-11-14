GoldenGame.controls = (function controls () {
  var game, controlList = {};

  var keyObject = function (input, callback) {
    return {
      input: input,
      callback: callback,
    };
  }

  var publicAPI = {
    UP: 'UP',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    MOVE: 'MOVE',
    IDLE: 'IDLE',
    ATTACK: 'ATTACK',

    registerGame: function (game) {
      controls.game = game;
    },

    add: function (name, keyCode, callback) {
      var input = controls.game.input.keyboard.addKey(keyCode);
      controlList[name] = keyObject(input, callback);
    },

    update: function () {
      if (controlList[publicAPI.UP].input.isDown) {
        controlList[publicAPI.UP].callback();
      }
      if (controlList[publicAPI.LEFT].input.isDown) {
        if (controlList[publicAPI.ATTACK].input.isDown) controlList[publicAPI.ATTACK].callback();
        else controlList[publicAPI.MOVE] ? controlList[publicAPI.MOVE].callback() : controlList[publicAPI.LEFT].callback();
      } else if (controlList[publicAPI.RIGHT].input.isDown) {
        if (controlList[publicAPI.ATTACK].input.isDown) controlList[publicAPI.ATTACK].callback();
        else controlList[publicAPI.MOVE] ? controlList[publicAPI.MOVE].callback() : controlList[publicAPI.RIGHT].callback();
      } else if (controlList[publicAPI.ATTACK].input.isDown) controlList[publicAPI.ATTACK].callback();
      else controlList[publicAPI.IDLE].callback();
    }
  }

  return publicAPI;
})()
