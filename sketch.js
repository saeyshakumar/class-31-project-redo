const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var stones = [];

function preload(){
zombie1 = loadImage("images/zombie.png")
zombie2 = loadImage("images/zombie2.png")
zombie3 = loadImage("images/zombie3.png")
zombie4 = loadImage("images/zombie4.png")
backgroundImg = loadImage("images/background.png")
zombiesad = loadImage("images/zombiesad.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  ground = new Base(0, height-10, width*2, 20,"#795548", true);
  leftwall = new Base(300, height/2 +50, 600, 100,"#8d6e63", true);
  rightwall = new Base(width-300, height/2 +50, 600, 100,"#8d6e63", true);
  bridge = new Bridge(15, {x:width/2-400, y:height/2});
  joinPoint = new Base(width-600, height/2+10, 40,20, "#8d6e63", true)
  Matter.Composite.add(bridge.body, joinPoint)
  jointLink = new Link(bridge, joinPoint)
  for(var i = 0; i <= 8; i++){
  var x = random (width/2-200, width/2 + 300)
  var y = random(-100, 100)
  var stone = new Stone(x,y,80,80)
  stones .push(stone)
  }
  zombie = createSprite(width/3, height-110);
  zombie.addAnimation("left to right", zombie1, zombie2, zombie1)
  zombie.addAnimation("right to left", zombie3, zombie4, zombie3)
  zombie.addImage("sad", zombiesad)
  zombie.scale = 0.1
  zombie.velocityX = 10
  breakButton = createImg("images/axe.png")
  breakButton.position(width-600, height/2-50);
  breakButton.class("breakButton")
  breakButton.size(50,50)
  breakButton.mouseClicked(handleButtonPress)
}

function draw() {
  background(51);
  Engine.update(engine);
  ground.show();
  bridge.show();
  leftwall.show();
  rightwall.show();
  joinPoint.show();
for(var stone of stones){
  stone.show();
  var pos = stone.body.position
  var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
  if(distance<=50){
    zombie.velocityX = 0
    Matter.Body.setVelocity(stone.body, {x:10, y:-10})
    zombie.changeImage("sad")
    collided = true
  }
  }
  if(zombie.position.x>= width-300){
    zombie.velocityX = -10
    zombie.changeAnimation("right to left")
  }
  if(zombie.position.x<= 300){
    zombie.velocityX = 10
    zombie.changeAnimation("left to right")
  }
  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(()=>{
    bridge.break();
  },1500)
}
