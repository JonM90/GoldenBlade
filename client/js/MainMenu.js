GoldenGame.MainMenu = function(){};

GoldenGame.MainMenu.prototype = {
  create: function() {
    //show the space tile, repeated
    // this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
    let N = Math.floor(Math.random() * 2);
    N === 1 ?
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'BG') :
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, '2ndBG');
    this.background.height = this.game.height
    this.background.width = this.game.width


    //give it speed in x
    this.background.autoScroll(-20, 0);

    //start game text
    var text = 'Golden Blade: Hacky Game'
    // text = "Tap to begin";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/3, text, style);
    t.anchor.set(0.5);

    //highest score
    // text = "Highest score: "+this.highestScore;
    text = "Tap to begin";
    text = "Highest score: "+ 9000;
    style = { font: "15px Arial", fill: "#fff", align: "center" };

    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
  },
  update: function() {
    if (this.game.input.activePointer.justPressed()) {
      // this.game.state.start('LevelSelect');
      this.game.state.start('PlayerSelect');
    }
  }
};
