var gridSize = 20;
var snake;
var newDir;
var timer;
var tickSpeed;
var apple;
var score;
var crashed;
var paused;

var setup = function(){
  background(0);
  newDir = "right";
  timer = millis();
  tickSpeed = 50;
  score = 0;
  textSize(32);
  textAlign(CENTER, TOP);
  crashed = false;
  paused = false;

  apple = {
    x:floor(random(0, width/gridSize))*gridSize + 10,
    y:floor(random(5, height/gridSize))*gridSize + 10
  }

  snake = {
    dir: "right",
    x: 110,
    y: 50,
    tail: [{x:50, y:50},
          {x:70, y:50},
          {x:90, y:50}]
  };
};

var crashCheck = function(){
  for(var c = 0; c < snake.tail.length; c++){
    if(snake.x === snake.tail[c].x && snake.y === snake.tail[c].y)  {
      crashed = true;
      fill(255,255,0);
      ellipse(snake.x, snake.y, gridSize, gridSize);
      stroke(255,0,0);
      strokeWeight(4);
      line(snake.x - 10, snake.y - 10, snake.x + 10, snake.y + 10);
      line(snake.x - 10, snake.y + 10, snake.x + 10, snake.y - 10);
    }
  }
};

var draw = function(){
  if(paused){
    return;
  }

  if(millis() - timer >= tickSpeed){
  background(0);
  snake.dir = newDir;
  if(!crashed){
    moveSnake();
  }
  drawSnake();
  crashCheck();
  eatApple();
  drawApple();
  drawScore();
  timer = millis();
  }
};

var eatApple = function(){
  if(snake.x === apple.x && snake.y === apple.y){
    snake.tail.push({x:snake.x, y:snake.y});
    moveApple();
    score++;
  }
};

var moveApple = function(){
  apple.x = floor(random(0, width/gridSize))*gridSize + 10;
  apple.y = floor(random(5, height/gridSize))*gridSize + 10;

  for(var i = 0; i < snake.tail.length; i++){
    if(apple.x === snake.tail[i].x && apple.y === snake.tail[i].y){
      moveApple();
    }
  }
};

var drawScore = function(){
  fill(255);
  stroke(12);
  strokeWeight(1);
  text(score, 250, 30);
};

var drawApple = function(){
  fill(255, 0, 0);
  ellipse(apple.x,apple.y, gridSize, gridSize);
};

var drawSnake = function(){
  fill(255,255,0);
  ellipse(snake.x, snake.y,gridSize, gridSize);
  for(var i = 0; i < snake.tail.length; i++){
    fill(0,255,0);
    stroke(0,0,0);
    strokeWeight(1);
    ellipse(snake.tail[i].x, snake.tail[i].y, gridSize, gridSize);
  }
};

var moveSnake = function(){
  snake.tail.push({x:snake.x, y:snake.y});
  if(snake.dir === "right"){
    snake.x += gridSize;
  } else if(snake.dir === "left"){
    snake.x -= gridSize;
  } else if(snake.dir === "up"){
    snake.y -= gridSize;
  } else if(snake.dir === "down"){
    snake.y += gridSize;
  }
  wrap();
  snake.tail.splice(0,1);
};

var keyPressed = function(){
  if(keyCode === RIGHT && snake.dir !== "left"){
    newDir = "right";
  }
  if(keyCode === LEFT && snake.dir !== "right"){
    newDir = "left";
  }
  if(keyCode === UP && snake.dir !== "down"){
    newDir = "up";
  }
  if(keyCode === DOWN && snake.dir!== "up"){
    newDir = "down";
  }
  if(keyCode === 82 && crashed){
    setup();
  }
  if(keyCode === 80 && !crashed){
    if(paused){
      paused = false;
    } else{
      paused = true;
      fill(30,30,30);
      rect(width/2 - 100, height/2 - 50, 200, 100);
      fill(0,255,0);
      text("PAUSED", width/2, height/2 - 16);
    }
  }
};

var wrap = function(){
  if(snake.x > width){
    snake.x -= width;
  } else if(snake.x < 0){
    snake.x += width;
  } else if(snake.y > height){
    snake.y -= height;
  } else if(snake.y < 0){
    snake.y += height;
  }
};
