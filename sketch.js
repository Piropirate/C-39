var PLAY = 0;
var RESTART = 1;
var END = 2;
var gameState;
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score
var ground, groundIMAGE;
var score, Stime, S;
var invisibleground;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop = loadAnimation("sprite_6.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundIMAGE = loadImage("jungle.jpg");
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function setup() {
  createCanvas(400,400);
  ground = createSprite(200,200,400,400);
  ground.addImage(groundIMAGE);
  ground.scale = 0.6;
  
  invisibleground = createSprite(200,370,800,10);
  invisibleground.visible = false;
  
  monkey_running.frameDelay = 3;
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale = 0.1;
  
  Stime = 0;
  score = 0;
  
  gameState = PLAY;
}

function draw() {
  background("lightblue");
  if(gameState === PLAY){
    food();
    obstacles();    
    Stime = Math.round(frameCount/50);
    // ground.velocityX = -5;
    if(monkey.x > ground.x + 100){
      ground.x = monkey.x + 100;
    }
    if(monkey.x > invisibleground.x + 100){
      invisibleground.x = monkey.x + 100;
    }
    monkey.velocityX = 5;
    camera.position.x = monkey.x;
    camera.position.y = displayHeight/4;
    if(keyDown("space") && monkey.y > 300){
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = RESTART; 
  }
  switch(score){
      case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      case 50: monkey.scale=0.2;
      break;
      default:
      break;
  }
  monkey.collide(invisibleground);
  obstacleGroup.setColliderEach("rectangle",0,0,400,400);
  drawSprites();
  if(gameState === RESTART){
    score = 0;
    monkey.scale = 0.1;
    monkey.VelocityX = 5
    gameState = PLAY;
  }
  if(Stime === 25){
    gameState = END;
  }
  if(gameState === END){
    monkey.setVelocity(0,0);
    monkey.changeAnimation("stop",monkey_stop);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    textSize(20);
    fill("white");
    text("Score : " + score, monkey.x + 100, 40);
  }

  textSize(20);
  fill("white");
  text("Score : " + score, 300, 40);
  text("Score : " + score, 800, 40);
  text("Score : " + score, 1300, 40);
  text("Score : " + score, 1800, 40);
  text("Score : " + score, 2300, 40);
  text("Score : " + score, 2800, 40);
  text("Score : " + score, 3300, 40);
  text("Score : " + score, 3800, 40);
  text("Score : " + score, 4300, 40);
  text("Score : " + score, 4800, 40);
  text("Score : " + score, 5300, 40);
  text("Score : " + score, 5800, 40);
}

function food(){
  if (frameCount % 100 === 0) {
    console.log(score);
    banana = createSprite(monkey.x + 200,120,10,10);
    banana.y = Math.round(random(150,230));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    //banana.velocityX = -5;
    banana.lifetime = 85;
    foodGroup.add(banana);
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 5;
  }
}

function obstacles(){
  if (frameCount % 200 === 0) {
    obstacle = createSprite(monkey.x + 200,340,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    //obstacle.velocityX = -5;
    obstacle.lifetime = 85;
    obstacleGroup.add(obstacle);
  }
}