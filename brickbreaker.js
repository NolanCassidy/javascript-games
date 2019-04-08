var platform;
var dir;
var bricks = [[],[],[],[],[]];
var ball;
var score;
var gameOn;
var startMenu;
var win;

var setup = function() {
    size(500,500);
    background(0);
    platform = {x:225, y:400, w:50, h:10, right:false, left:false, lives:1};
    for (var j = 0; j < bricks.length; j ++){
     for (var i = 0; i < 10; i++) {
        bricks[j][i] = {x:1 + i * 50, y:50 + j * 25, w:49, h:24, draw: true};
      }
    }
    dir = "none";
    ball = {x:245, y:250, w:10, h:10, down:true, right:true, speed:1};
    score = 0;
    gameOn = false;
    startMenu = true;
    win = false;
};

var draw = function() {
  size(500,500);
  background(0);
  drawPlatform();
  move(5);
  fill(255);
  textSize(18);
  text(score, 240, 20);
  text("Lives: " + platform.lives, 40, 20);
  drawBricks();
  drawBall();
  checkLives();
  if (gameOn) {
    moveBall();
  }
  else if (startMenu) {
    startGame();
  }
  if (score === 50) {
    winGame();
  }
};

var keyPressed = function() {
  if(keyCode == RIGHT) {
    platform.right = true;
  }
  else if(keyCode == LEFT) {
    platform.left = true;
  }

  if (keyCode === 32 && gameOn === false) {
    gameOn = true;
    startMenu = false;
  }
};

var keyReleased = function() {
  if(keyCode == RIGHT) {
    platform.right = false;
  }
  else if(keyCode == LEFT) {
    platform.left = false;
  }
};

var mouseClicked = function() {
  if (!gameOn && mouseX > 125 && mouseX < 275
      && mouseY > 150 && mouseY < 300) {
        setup();
      }
};

function drawPlatform() {
  fill(255);
  rect(platform.x, platform.y, platform.w, platform.h);
}

function move(speed) {
  if (platform.right && platform.x < 450) {
    platform.x += speed;
  }
  else if (platform.left  && platform.x > 0) {
    platform.x -= speed;
  }
}

function drawBricks() {
  var r = 200;
  var g = 0;
  var b = 0;
  for (var j = 0; j < bricks.length; j ++) {
    fill(r, g, b);
    for (var i = 0; i < bricks[j].length; i++) {
      if (bricks[j][i].draw) {
        rect(bricks[j][i].x, bricks[j][i].y, bricks[j][i].w, bricks[j][i].h);
      }
    }
    g += 50;
    b += 50;
  }
}

function drawBall() {
  fill(255, 255, 102);
  rect(ball.x, ball.y, ball.w, ball.h);
}

function moveBall() {
  if (ball.down) {
    ball.y += ball.speed;
  } else {
    ball.y -= ball.speed;
  }

  if (ball.right){
    ball.x += ball.speed;
  } else {
    ball.x -= ball.speed;
  }

  if (ball.x > 490 || ball.x < 10) {
    ball.right = !ball.right;
  }

  if (ball.y >490) {
    ball.x = 225;
    ball.y = 250;
    platform.lives--;
  }

  if (ball.y < 10) {
    ball.down = !ball.down;
  }
  if (collision(platform,ball)) {
    ball.down = !ball.down;
  }

  for (var j = 0; j < bricks.length; j ++){
     for (var i = 0; i < bricks[j].length; i++) {
        if (collision(bricks[j][i],ball) && bricks[j][i].draw) {
          ball.down = !ball.down;
          bricks[j][i].draw = !bricks[j][i].draw;
          score++;
        }
      }
    }
}

function collision(object1, object2) {
  if( object1.x + object1.w > object2.x &&
      object1.x < object2.x + object2.w &&
      object2.y + object2.h > object1.y &&
      object2.y < object1.y + object1.h){
        return true;
      } else {
        return false;
      }
}

function checkLives() {
  if(platform.lives === 0 || win){
    gameOn = false;
    fill(250);
    strokeWeight(5);
    stroke(255, 100,100);
    rect(125, 150, 250, 150);
    fill(0);
    text("Click to restart", 250, 225);
    strokeWeight(1);
    stroke(0);
  }
}

function winGame() {
  fill(100, 255, 255);
  textSize(80);
  text("YOU WIN!!!", 250, 375);
  gameOn = false;
  win = true;
}

function startGame() {
  fill(250);
  strokeWeight(5);
  stroke(100, 255,100);
  rect(125, 150, 250, 150);
  fill(0);
  textAlign(CENTER);
  text("Press space to start", 250, 225);
  strokeWeight(1);
  stroke(0);
}
