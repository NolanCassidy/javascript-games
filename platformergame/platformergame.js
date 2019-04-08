var player = {x:400,y:400,w:25,h:25};

var walls = [{x:0,y:-50,w:50,h:550},
             {x:450,y:0,w:50,h:500},
             {x:0,y:450,w:500,h:50},
             {x:0,y:350,w:150,h:100},
             {x:200,y:250,w:150,h:50},
             {x:400,y:150,w:650,h:50},
             {x:0,y:50,w:350,h:50},
             {x:250,y:0,w:50,h:50},
             {x:50,y:0,w:50,h:50},
             {x:-250,y:-800,w:250,h:1450},
             {x:0,y:500,w:1000,h:150},
             {x:50,y:-150,w:50,h:50},
             {x:250,y:-150,w:50,h:50},
             {x:350,y:-250,w:700,h:50},
             {x:500,y:50,w:50,h:100},
             {x:550,y:100,w:50,h:50},
             {x:950,y:-100,w:500,h:300},
             {x:850,y:-700,w:50,h:350},
             {x:450,y:-500,w:350,h:50},
             {x:-250,y:-1100,w:1100,h:500},
             {x:350,y:-600,w:50,h:150},
             {x:900,y:-400,w:150,h:50},
             {x:1000,y:-400,w:50,h:150},
             {x:900,y:-1100,w:150,h:700}];

var checkpoints = [{x:900,y:-300,w:50,h:50},
               {x:250,y:-50,w:50,h:50},
               {x:400,y:400,w:50,h:50}];

var doom = [{x:450,y:-260,w:50,h:10},
            {x:550,y:-260,w:50,h:10},
            {x:650,y:-260,w:50,h:10},
            {x:750,y:-260,w:50,h:10},
            {x:100,y:40,w:150,h:10}];

var jumpboots = {x:963,y:-275,w:25,h:25};

var restart = {x:400,y:400};

var up = 0;
var down = 0;
var left = 0;
var right = 0;

var spd = 4;

var gravity = 0;
var maxGravity = 16;

var jump = 0;
var jumpHeight=16;

var offx = 0;
var offy = 0;

var draw = function() {
  offx = 238-player.x;
  offy = 288-player.y;
  background(50,50,150);

  //Draw walls
  noStroke();
  drawWalls();
  drawDoom();
  drawCheckpoints();
  drawJumpboots();
  drawGrid();

  //Control Player
  movePlayer();

  //Draw player
  fill(255,100,0);
  //rect(player.x,player.y,25,25);
  rect(238,288,25,25);
};

var drawWalls = function() {
  fill(100,100,255);
  for (var w = 0; w < walls.length; w++) {
    rect(walls[w].x+offx,walls[w].y+offy,walls[w].w,walls[w].h);
  }
};

var drawDoom = function() {
  fill(255,0,0);
  for (var d = 0; d < doom.length; d++) {
    rect(doom[d].x+offx,doom[d].y+offy,doom[d].w,doom[d].h);

    if (collision(doom[d],player)) {
      restart();
    }
  }
};

var drawCheckpoints = function() {
  for (var c = 0; c < checkpoints.length; c++) {
    if (checkpoints[c].x === restart.x && checkpoints[c].y === restart.y) {
      fill(255);
    } else {
      fill(150);
    }
    ellipse(checkpoints[c].x+offx+25,checkpoints[c].y+offy+25,25,25);
    if (collision(checkpoints[c],player)) {
      restart.x = checkpoints[c].x;
      restart.y = checkpoints[c].y;
    }
  }
};

var drawJumpboots = function() {
  fill(0,255,0);
  if (jumpHeight < 22) {
    rect(jumpboots.x+offx,jumpboots.y+offy,25,25);
    if (collision(player,jumpboots)) {
      jumpHeight=22;
    }
  }
};

var restart = function() {
  player.x = restart.x;
  player.y = restart.y;
};

var movePlayer = function() {
  //What direction will we multiply spd by?
  // -1 left
  // 1 right
  // 0 both/neither
  var dir = right - left;


  //Move as far as you can in the direction you are moving
  //Start at maximum distance and step down by 1 pixel at a time
  //until movement is acheived or distance == 0
  for (var s = spd; s > 0; s--) {
    if (placeFree(player,player.x + s*dir,player.y)) {
      player.x += s*dir;
      break;
    }
  }

  //If you are on the ground and you press up, set
  //jump to jumpHeight
  if (!placeFree(player,player.x,player.y+1) && up) {
    jump = jumpHeight;
  }

  //If you are jumping, call player_jump()
  //Otherwise call playerFall()
  if (jump > 0) {
    playerJump();
  } else {
    playerFall();
  }
};

var playerFall = function() {
  for (var f = gravity; f > 0; f--) {
    if (placeFree(player,player.x, player.y + f)) {
      player.y += f;
      break;
    }
  }

  //If there is ground beneath you, set gravity to 0
  //Otherwise increase gravity by 1, but don't exceeed
  //the maximum fall speed
  if (!placeFree(player,player.x,player.y+1)){
    gravity = 0;
  } else {
    gravity = min(gravity+1,maxGravity);
  }
};

var playerJump = function() {
  for (var j = jump; j > 0; j--) {
    if (placeFree(player,player.x, player.y - j)) {
      player.y -= j;
      break;
    }
  }

  //Stop jumping if the player lets go of the button
  if (!up) {
    jump = 0;
  }

  //Slowly decrease jump speed but don't go below 0
  jump = max(jump-1,0);
};

var placeFree = function(obj,newX,newY) {
 var temp = {x:newX, y:newY, w:obj.w, h:obj.h};

 for (var i = 0; i < walls.length; i++) {
   if (collision(temp,walls[i])) {
     return false;
   }
 }

 return true;
};

var collision = function(r1, r2) {
  if (r1.x + r1.w > r2.x &&
      r1.x < r2.x + r2.w &&
      r2.y + r2.h > r1.y &&
      r2.y < r1.y + r1.h) {
        return true;
  } else {
    return false;
  }
};

var drawGrid = function() {
  for (var i = -500; i<1000; i+=50) {
    stroke(0,0,255);
    line(i+floor(player.x/50)*50-player.x+238,0,i+floor(player.x/50)*50-player.x+238,500);
    fill(255);
    text(i+floor(player.x/50)*50,i+floor(player.x/50)*50-player.x+238,10);
  }

  for (var j = -500; j<1000; j+=50) {
    stroke(0,0,255);
    line(0,j+floor(player.y/50)*50-player.y+288,500,j+floor(player.y/50)*50-player.y+288);
    fill(255);
    text(j+floor(player.y/50)*50,10,j+floor(player.y/50)*50-player.y+298);
  }
};

var keyPressed = function() {
  if (keyCode === UP) {
    up = 1;
  }
  if (keyCode === DOWN) {
    down = 1;
  }
  if (keyCode === LEFT) {
    left = 1;
  }
  if (keyCode === RIGHT) {
    right = 1;
  }

};

var keyReleased = function() {
  if (keyCode === UP) {
    up = 0;
  }
  if (keyCode === DOWN) {
    down = 0;
  }
  if (keyCode === LEFT) {
    left = 0;
  }
  if (keyCode === RIGHT) {
    right = 0;
  }

};
