var dinoI, dino,ground,cloud,ran,cactus,desert,score=0,gamestate = "play",highscore = 0,touches = [];
function preload(){
   dinoI = loadAnimation("trex3-1.png","trex1.png","trex4.png");
  ground8 = loadAnimation("ground2.png");
  cloud3 = loadAnimation("cloud.png");
  cactus10 = loadAnimation("obstacle1.png");
  cactus20 = loadAnimation("obstacle2.png");
  cactus30 = loadAnimation("obstacle3.png");
  cactus40 = loadAnimation("obstacle4.png");
  cactus50 = loadAnimation("obstacle5.png");
  cactus60 = loadAnimation("obstacle6.png");
  game39 = loadAnimation("gameOver.png");
  retry23 = loadAnimation("restart.png");
  checkpoint3 = loadSound("checkPoint.mp3");
  die43 = loadSound("die.mp3");
  jump22 = loadSound("jump.mp3");
  dino30 = loadAnimation("trex_collided.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
   dino=createSprite(100,height/2+80,50,80);
  dino.addAnimation("hello",dinoI);
  dino.scale=0.7;
 // dino.setCollider("rectangle",0,0,50,100,0);
  dino.setCollider("circle",0,0,30);
  dino.addAnimation("car",dino30);
 // dino.debug=true;
 ground=createSprite(200,height-50,800,10);
  ground.addAnimation("hi",ground8);
  ground2=createSprite(200,height-40,800,10);
  ground2.visible=false;
   ground.velocityX=-3;
//  cloud=createSprite(160,200,20,20);
//  cloud.addAnimation("ok",cloud3);
//  cloud.scale=0.9;
  desert=new Group();
 air=new Group(); 
  game=createSprite(width/2,height/4,20,20);
  game.addAnimation("k",game39);
  game.scale=0.7;
  game.visible=false;
  retry=createSprite(width/2,height/4+30,20,20);
  retry.addAnimation("l",retry23);
  retry.scale=0.6;
 
}


function draw() {
  background("white");
  if(gamestate == "play"){
     retry.visible=false;
    game.visible=false;
   if((touches.length>0 || keyDown("space"))&&dino.y>=320){
     dino.velocityY  =-15;
    jump22.play
     touches = [];
     }
  dino.velocityY=dino.velocityY+0.5;
    
  if(ground.x<=0){
    ground.x=200;
  }
    ran=(Math.round(random(height/2-50,height/2)));
  //%(MODULUS);14%3=2,30%5=0;
  if(frameCount%60==0){
      cloud=createSprite(width+50,ran,20,20); 
    air.add(cloud);
  cloud.addAnimation("ok",cloud3);
  cloud.scale=0.9;
    cloud.velocityX=-3;
    cloud.lifetime=200;
    cloud.depth=dino.depth;
  //  console.log("c-",cloud.depth);
  }//end of if(clouds)
   if(frameCount%90==0){
  cactus=createSprite(width+50,height-80,10,60);
    cactus.velocityX=-3;
    cactus.lifetime=200;
    desert.add(cactus);
  //  cactus.addAnimation("book",cactus10);
    var r = Math.round(random(1,6));
  switch(r){
    case 1:cactus.addAnimation("a",cactus10);
      cactus.scale=0.7;break;
    case 2:cactus.addAnimation("w",cactus20);
      cactus.scale=0.7;break;
    case 3:cactus.addAnimation("u",cactus30);
      cactus.scale=0.7; break;
    case 4:cactus.addAnimation("o",cactus40);
      cactus.scale=0.7;break;
    case 5:cactus.addAnimation("i",cactus50);
      cactus.scale=0.7;break;
    case 6:cactus.addAnimation("l",cactus60);
      cactus.scale=0.7;break;
       default:break;
  }//end of switch
    console.log(r);
  }//end of if(obstacle);
    if(dino.isTouching(desert)){
       die43.play();
      gamestate = "end";
      }//end of if(end game);
     score=score+1;
    if(score%100 == 0){
      ground.velocityX =ground.velocityX -1;
      desert.setVelocityXEach(ground.velocityX);
      checkpoint3.play();
    }
    if(score>highscore){
      highscore=score;
    }
    dino.changeAnimation("hello",dinoI);
  }//end of gamestateplay
    dino.collide(ground2);
 
 // console.log(dino.y);
//console.log(frameCount);
if(gamestate == "end"){
  ground.velocityX=0;
    desert.setVelocityXEach(0);
    air.setVelocityXEach(0);
    desert.setLifetimeEach(-1);
    air.setLifetimeEach(-1);
    dino.velocityY=0;
    game.visible=true;
    retry.visible=true;
   dino.changeAnimation("car",dino30);
  
  if(mousePressedOver(retry)){
    gamestate = "play";
    desert.destroyEach();
    air.destroyEach();
    score=0;
    ground.velocityX=-3;
  }
}
  text(score ,width-40,20);
  text(highscore,width-100,20);
  // console.log("p-",dino.depth);
//  console.log(frameCount);
 // console.log(getFrameRate());
  dino.depth=dino.depth+1;
  drawSprites();
}