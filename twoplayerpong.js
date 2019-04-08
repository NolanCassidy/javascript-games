noStroke();

var speed = 5;
var start1 = false;
var start2 = false;
var finish = false;
var winScore = 10;

var xPos = 0;
var yPos = 0;

var p1 = {x: 20, y: 225, w: 10, h:50, up: false, down: false, score: 0};
var p2 = {x: 470, y: 225, w: 10, h:50, up: false, down: false, score: 0};

var ball = {x: 150, y:150, w:10, h:10, velx: 1, vely:1};

var draw = function() {

  if(!start1 && !start2 && !finish) {
    background(0);

    //out layer
    fill(100);
    strokeWeight(5);
    stroke(200);
    rect(100, 150, 300, 200, 50);
    textSize(40);
    fill(255);
    strokeWeight(0);
    text("Pong", 200, 200);

    //1 player
    fill(150);
    strokeWeight(5);
    stroke(200);
    rect(150, 250, 75, 50, 50);
    textSize(20);
    fill(0);
    strokeWeight(0);
    text("1 P", 175, 280);

    //2 player
    fill(150);
    strokeWeight(5);
    stroke(200);
    rect(270, 250, 75, 50, 50);
    textSize(20);
    fill(0);
    strokeWeight(0);
    text("2 P", 295, 280);
  }

  else if(start1) {
    background(0);
    drawDash();
    drawPlayer();
    drawBall();
    moveBall();
    movePlayer(p1);
    moveComp(p2);
    scoreText();
  }

  else if(start2) {
    background(0);
    drawDash();
    drawPlayer();
    drawBall();
    moveBall();
    movePlayer(p1);
    movePlayer(p2);
    scoreText();
  }

  else if(finish) {
    background(0);
    fill(255);
    if(p1.score == winScore){
      textSize(40);
      text("Player 1 win!", 140,230);
    }
    if(p2.score == winScore){
      textSize(40);
      text("Player 2 win!", 140,230);
    }
    fill(200);
    rect(150, 250, 200, 75, 50);
    fill(100);
    text("Restart", 185, 300);
  }
};


var mouseClicked = function() {
  xPos = mouseX;
  yPos = mouseY;
  fill(255);
  textSize(10);
  if(mouseX > 150 && mouseX < 225 && mouseY > 250 && mouseY < 300 && !finish) {
    start1 = true;
  }

  else if(mouseX > 270 && mouseX < 345 && mouseY > 250 && mouseY < 300 && !finish) {
    start2 = true;
  }

  else if(mouseX > 150 && mouseX < 350 && mouseY > 250 && mouseY < 325 && finish){
    finish = false;
    reset();
  }
};

var reset = function() {
  p1.score = 0;
  p2.score = 0;
  p1.y = 225;
  p2.y = 225;
};

var drawDash = function() {
  fill(255);

  for(var i = 0; i < 18; i++){
    rect(245, i * 30 + 2, 5, 15);
  }
};

var drawPlayer = function() {
  fill(255);
  rect(p1.x, p1.y, p1.w, p1.h);
  rect(p2.x, p2.y, p2.w, p2.h);
};

var drawBall = function() {
  fill(255);
  rect(ball.x, ball.y, ball.w, ball.h);
};

var moveBall = function() {

  //change direction of ball once it hits the player
  if((ball.y > p1.y && ball.y < p1.y + p1.h && ball.x  == p1.x + p1.w) ||
      (ball.y > p2.y && ball.y < p2.y + p2.h && ball.x + ball.w == p2.x)){
        ball.velx *= -1;

        //randomize the y velocity depending on where it hits the player
        if(p1.y - ball.y > 0 ||
           p2.y - ball.y > 0){
          ball.vely = random(-2, 0);
        }
        if(p1.y - ball.y <= 0 ||
           p2.y - ball.y <= 0){
          ball.vely = random(2);
        }
  }

  /*-------------x portion ------------- */
  //moves ball in the direction its pointing
  ball.x += ball.velx;


  /*-------------y portion -------------- */
  ball.y += ball.vely;

  if(ball.y <= 0 || ball.y + ball.h >= 500){
    ball.vely *= -1;
  }

  //goes beyond the players
  if(ball.x > p2.x + p2.w + 20){
    p1.score++;
    ball.x = 250;
    ball.y = 250;
    ball.vely = random(2);
  }
  if(ball.x + ball.w  + 20 < p1.x){
    p2.score++;
    ball.x = 250;
    ball.y = 250;
    ball.vely = random(-2, 0);
  }
};

var movePlayer = function(obj) {
  if(obj.up && obj.y > 0) {
    obj.y -= speed;
  }
  if(obj.down && obj.y < 450) {
    obj.y += speed;
  }
};

var moveComp = function(obj) {
  if(obj.y + obj.h/2 < ball.y && obj.y < 450) {
    obj.y+=2;
  } else if(obj.y > ball.y + ball.h && obj.y > 0) {
    obj.y-=2;
  }
};

var scoreText = function() {
  fill(255);
  textSize(20);
  text(p1.score, 15,30);
  text(p2.score, 470,30);

  if(p1.score == winScore || p2.score == winScore){
    start1 = false;
    start2 = false;
    finish = true;
  }
};

var keyPressed = function() {
  if(keyCode == UP){
    p2.up = true;
  }
  if(keyCode == DOWN){
    p2.down = true;
  }
  if(keyCode == 87){
    p1.up = true;
  }
  if(keyCode == 83){
    p1.down = true;
  }
};

var keyReleased = function() {
  if(keyCode == UP){
    p2.up = false;
  }
  if(keyCode == DOWN){
    p2.down = false;
  }
  if(keyCode == 87){
    p1.up = false;
  }
  if(keyCode == 83){
    p1.down = false;
  }
};
