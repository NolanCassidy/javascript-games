var player = {x: 150, y: 250, size: 50};
var coins = [];
var gap = {height: 300, y:250};
var walls = [];
var gravity = 0;
var crashed = false;
var goUp = false;
var score = 0;
var wallTimer = 0;
var smoke = [];
var smokeTimer = 20;

var draw = function() {
  noStroke();
  background(0,0,0);
  drawPlayer();
  drawWalls();
  if (smokeTimer <= 0) {
    smokeTimer = 5;
    creatSmoke();
  } else {
    smokeTimer--;
  }



  if (crashed === false) {
     movePlayer();
     doCoin();
     doSmoke();
     moveWalls();
  } else {
    youLoseScreen();
  }
  drawScore();
};
var doCoin = function() {
  var filteredCoins = coins.filter((coin) => {return coin.x > 0 && !coin.collected});
  coins = filteredCoins;

  if (random(0,100) < 1) {
    var newCoin = {x: 600, y: random(0,500), size: 20, collected: false};
    coins.push(newCoin);
  }

  for (var coin of coins) {


  fill(250,250,0);
  ellipse(coin.x, coin.y, coin.size, coin.size);
  coin.x -= 3;
  var playerRadius = player.size / 2;
  var coinRadius = coin.size / 2;
  var touchDistence = playerRadius + coinRadius;
  var realDistence = dist(player.x,player.y,coin.x,coin.y);
  if (realDistence < touchDistence){
    coin.collected = true;
    score += 1;
  }
  }
};
var drawPlayer = function() {
  fill(0, 0,250);
  ellipse(player.x, player.y, player.size, player.size);
};
   fill(128,0,0);
var movePlayer = function() {
  if (goUp) {
    gravity -= 0.4;
  } else {
    gravity += 0.4;
  }

  if (gravity > 8) {
    gravity = 8;
  }
  if (gravity < -6) {
    gravity = -6;
  }

  player.y += gravity;

  if (player.y > 500 || player.y < 0) {
    crashed = true;

  }
};




var mousePressed = function() {
  if (mouseButton === LEFT) {
    goUp = true;


    if (crashed) {
      crashed = false;
      player.y = 250;
      gravity = 0;
      score = 0;
      coins = [];
      walls = []

    }
  }
};

var mouseReleased = function() {
  if (mouseButton === LEFT) {
    goUp = false;
  }
};

var youLoseScreen = function() {
  fill(255);


  textSize(24);


  text("Game Over", 200, 200);


  text("Click to Restart", 180, 350);


};
var drawScore = function() {
  fill(255, 250, 0);
  textSize(24);
  text(score, 50, 450);
};
var drawWalls = function() {
 for (var wall of walls){
   rect(wall.x,wall.y,wall.w,wall.h);

 }
};
var moveWalls = function() {
 for (var wall of walls) {
   wall.x -= 3;

   if (wall.x < player.x && wall.x + wall.w > player.x) {
     if (wall.y < player.y && wall.y + wall.h > player.y) {
       crashed = true;
     }
   }

 }
 if (wallTimer <= 0) {
  wallTimer = 16;
  gap.y += 25 * floor(random(3) - 1);

  if (gap.y < 150) {
    gap.y = 150;
  }
  if (gap.y > 350) {
    gap.y = 350;
  }

  var newWall = {x: 500, y: 0, w: 50,h: gap.y - gap.height / 2};
  walls.push (newWall);
  newWall = {x: 500,y: gap.y + gap.height/2, w: 50, h: 500};
   walls.push (newWall);
 }
 wallTimer -= 1;

 };
 var creatSmoke = function() {
   var newSmoke = {x:player.x, y:player.y, size:10};
   smoke.push(newSmoke);
 };
 var doSmoke = function() {
   smoke = smoke.filter((s) => {return s.x > -50});
   for (var s of smoke) {
     fill(200,200,200,175);
     ellipse(s.x, s.y, s.size, s.size);


     s.x -= 4;
     s.size++;
   }
 };
