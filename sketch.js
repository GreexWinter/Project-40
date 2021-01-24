var database;

var allPlayers;
var player, players, form, game;
var player1, player2;

var fruits, fruitGroup;
var fruit1_image, fruit2_image, fruit3_image, fruit4_image, fruit5_image;
var player_image;
var backround_image;

var gameState = 0;
var playerCount = 0;
var score = 0;
var player1score = 0;
var player2score = 0;

function preload(){
  backround_image = loadImage("images/jungle.jpg");
  player_image = loadImage("images/basket2.png");
  fruit1_image = loadImage("images/apple2.png");
  fruit2_image = loadImage("images/banana2.png");
  fruit3_image = loadImage("images/melon2.png");
  fruit4_image = loadImage("images/orange2.png");
  fruit5_image = loadImage("images/pineapple2.png");
  fruitGroup = new Group();
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backround_image);

  // Add conditions for gameStates and playerCount
  if (gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  if(playerCount === 2){
    game.update(1);
  }
}