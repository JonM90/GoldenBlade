var GoldenGame = GoldenGame || {};
let canvasWidth = window.innerWidth * window.devicePixelRatio;
let canvasHeight = window.innerHeight * window.devicePixelRatio;

GoldenGame.game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '');

GoldenGame.game.state.add('Boot', GoldenGame.Boot);
GoldenGame.game.state.add('Preload', GoldenGame.Preload);
GoldenGame.game.state.add('MainMenu', GoldenGame.MainMenu);
//GoldenGame.game.state.add('mainSocket', GoldenGame.mainSocket);
GoldenGame.game.state.add('PlayerSelect', GoldenGame.PlayerSelect);
GoldenGame.game.state.add('LevelSelect', GoldenGame.LevelSelect);
// GoldenGame.game.state.add('Game', GoldenGame.Game);
GoldenGame.game.state.add('Level1', GoldenGame.Level1);
GoldenGame.game.state.add('Level2', GoldenGame.Level2);
GoldenGame.game.state.add('Level3', GoldenGame.Level3);
GoldenGame.game.state.add('Level4', GoldenGame.Level4);
// GoldenGame.game.state.add('Level5', GoldenGame.Level5);

GoldenGame.game.state.start('Boot');
// GoldenGame.game = new Phaser.Game(GoldenGame.gameProperties.screenWidth, GoldenGame.gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
GoldenGame.controls.registerGame(GoldenGame.game);
