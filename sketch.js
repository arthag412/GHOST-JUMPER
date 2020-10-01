var tower, towerImage;
var doorImage, doorGroup;
var climberImage, climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleGroup;
var gameState="play";
var spookySound;


function preload() {

  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
   
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup=new Group();
  
}

function setup() {
  createCanvas(600, 600);
  
  spookySound.loop();

  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage(ghostImage);
  
}

function draw() {
  background("black");

  if (tower.y > 400) {
    tower.y = 300;

  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY=0;
  }
  
  if(invisibleGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
    
  }
  if(gameState==="play"){
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  spawnDoors();

  drawSprites();
  
}
if(gameState==="end"){
  stroke("yellow");
 textSize(30);
  text("GAME OVER",230,250);
  
  
}
}
  function spawnDoors() {
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(random(120, 400));
    
    var climber = createSprite(200, 10); 
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    climber.addImage(climberImage);
    
    door.addImage(doorImage);
    door.velocityY = 1;
    climber.velocityY = 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    climber.x = door.x;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleGroup.add(invisibleBlock);
    doorGroup.add(door);
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    invisibleBlock.debug=true;
  }

}