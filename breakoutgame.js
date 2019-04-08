//need to fix collision and boundaries to fit the ellipse

var gameWidth = 400;
var gameHeight = 400;

var score = 0;
var lives = 5;

var win = 0;
var lose = 0;

var diameter = 10;
var ball = {x: gameWidth/2, y: gameHeight * 2/3,
            w: diameter, h:diameter};

var dx = -2;
var dy = 2;

var playerWidth = 75;
var playerHeight = 15;
var player = {x: gameWidth * 1/4, y:gameHeight - 16,
              w: playerWidth, h: playerHeight};

var playerSpeed = 5;
var left = 0;
var right = 0;

var blocks = [];
var blockNum = 0;

for(var i = 0; i < 8; i++){
  for(var j = 0; j < 5; j++) {
    blocks[blockNum] = {x: i * 50 + 5, y: j * 30, w: 40, h:20, show:1, lives: 6 - j};
    blockNum++;
  }
}

var draw = function() {
  size(gameWidth, gameHeight);

  background(102, 204, 255);

  drawBlocks();

  drawBall();

  drawPlayer();

  drawText();
};

//ball is object 1
var collision = function(o1,o2) {
  if(o1.x + o1.w/2 > o2.x &&
    o1.x - o1.w/2 < o2.x + o2.w &&
    o2.y + o2.h > o1.y - o1.h/2 &&
    o2.y < o1.y + o1.h/2)
    {
      return true;
    } else {
      return false;
    }
};

var keyPressed = function () {
  if(keyCode == LEFT) {
    left = 1;
  }
  if(keyCode == RIGHT) {
    right = 1;
  }
};

var keyReleased = function () {
  if(keyCode == LEFT) {
    left = 0;
  }
  if(keyCode == RIGHT) {
    right = 0;
  }
};

var drawBlocks = function() {
  fill(153, 0, 204);
  for(var a = 0; a < blocks.length; a++) {
    if(collision(ball, blocks[a]) && blocks[a].show == 1) {
      blocks[a].show = 0;
      dy = -dy;
      score++;
      blocks[a].lives--;
    }

    if(blocks[a].show == 1) {
      rect(blocks[a].x, blocks[a].y, blocks[a].w, blocks[a].h);
    }
  }
};

var drawBall = function() {
  if(ball.x - diameter < 0 || ball.x + diameter > gameWidth) {
    dx = -dx;
  }
  if(ball.y - diameter < 0 || ball.y + diameter > gameWidth) {
    dy = -dy;
  }

  fill(0, 0, 204);

  if(win != 1 && lose != 1) {
    ball.x += dx;
    ball.y += dy;
  }

  if(ball.y > gameHeight - 10) {
    lives--;
    ball.x = gameWidth/2;
    ball.y = gameHeight * 2/3;
  }
  ellipse(ball.x, ball.y, ball.w, ball.h);
};

var drawPlayer = function() {
  if (left === 1) {
    if(player.x > 0) {
      player.x -= playerSpeed;
    }
  }
  if(right === 1) {
    if(player.x + playerWidth < gameWidth) {
      player.x += playerSpeed;
    }
  }

  fill(102, 0, 102);

  rect(player.x, player.y, player.w, player.h);

  if(collision(ball, player)) {
    dy = -dy;
  }
};

var drawText = function() {
  fill(0);
  textSize(14);
  text("Score: " + score, 10, gameHeight - 40);
  text("Lives: " + lives, 10, gameHeight - 20);

  if(lives <= 0) {
    lose = 1;
    textSize(30);
    text("You lose!", 20, gameHeight - 80);
  }

  if(score >= 40) {
    win = 1;
    textSize(30);
    text("You win!", 20, gameHeight - 80);
  }
};
