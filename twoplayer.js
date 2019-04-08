size(500, 500);

var right = 0;
var up = 0;
var down = 0;
var left = 0;
var right2 = 0;
var up2 = 0;
var down2 = 0;
var left2 = 0;
var goldPoints = 0;


var walls = [{x:0, y:0, w:500, h:10},
{x:0, y:0, w:10, h:500},{x:250, y:0, w:10, h:100},
{x:0, y:490, w:500, h:10},
{x:490, y:0, w:10, h:500}];
var gold = [{x:150, y:150, w:10, h:10, show:1},
{x:150, y:450, w:10, h:10, show:1},
{x:270, y:400, w:10, h:10, show:1},
{x:100, y:370, w:10, h:10, show:1}];
var player = {x:50, y:50, w:10, h:10, g:0};
var p2 = {x:100, y:50, w:10, h:10, g:0}
var startx = 0;
var starty = 0;
var startGold = 0;

var draw = function() {
  background(255, 255, 255);
  noStroke();

  drawPlayer();
  drawP2();
  drawWalls();
  drawGold();
  if(up || down || left || right){
    movePlayer(player, 5);
  }
  if(up2 || down2 || left2 || right2){
    moveP2(p2, 5);
  }
  checkScore();

};

var drawPlayer = function() {
  fill(255, 0, 0);
  rect(player.x, player.y, player.w, player.h);

};

var drawP2 = function() {
  fill(255, 100, 0);
  rect(p2.x, p2.y, p2.w, p2.h);

};

var drawWalls = function() {
  fill(0, 0, 255);
  for( var i = 0; i < walls.length; i++) {
    rect(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
  }
};

var drawGold = function() {
  fill(255, 255, 0);
  for( var w = 0; w < gold.length; w++) {
    if (gold[w].show === 1) {
      rect(gold[w].x, gold[w].y, gold[w].w, gold[w].h);
      //image (diamonds, gold[w].x, gold[w].y, gold[w].w+25, gold[w].h + 25);
    }
  }
};

var checkScore = function() {
  fill(0);
  textSize(14);
  text("Player 1: " + player.g, 10, 490);
  text("Player 2: " + p2.g, 100, 490);
  if(player.g + p2.g === gold.length){
    if(player.g>p2.g){
      textSize(40);
      text("Player 1 wins!", 100, 250);

    } else if(player.g<p2.g){
      textSize(40);
      text("Player 2 wins!", 100, 250);
    } else{
      textSize(40);
      text("It's a tie", 150, 250);
    }
  }
};

var reset = function() {
  goldPoints = startGold;
  player.x = startx;
  player.y = starty;

  for( var ind = 0; ind < gold.length; ind++) {
    gold[ind].show = 1;
  }
};

var movePlayer = function(obj, speed) {
  if(right === 1) {
    obj.x += speed;

    for ( var m = 0; m < walls.length; m++) {
      while (collision(obj, walls[m])) {
        obj.x -= speed;
      }
    }

    checkGold(obj);

  } else if (left === 1) {
    obj.x -= speed;

    for ( var n = 0; n < walls.length; n++) {
      while (collision(obj, walls[n])) {
        obj.x += speed;
      }
    }
    checkGold(obj);

  } else if (up === 1) {
    obj.y -= speed;

    for ( var o = 0; o < walls.length; o++) {
      while (collision(obj, walls[o])) {
        obj.y += speed;
      }
    }
    checkGold(obj);

  } else if (down === 1) {
    obj.y += speed;

    for ( var p = 0; p < walls.length; p++) {
      while (collision(obj, walls[p])) {
        obj.y -= speed;
      }
    }

    checkGold(obj);

  }
};

var moveP2 = function(obj, speed) {
  if (down2 === 1) {
    obj.y += speed;

    for ( var p = 0; p < walls.length; p++) {
      while (collision(obj, walls[p])) {
        obj.y -= speed;
      }
    }

    checkGold(obj);

  } else if(right2 === 1) {
    obj.x += speed;

    for ( var m = 0; m < walls.length; m++) {
      while (collision(obj, walls[m])) {
        obj.x -= speed;
      }
    }

    checkGold(obj);

  } else if (left2 === 1) {
    obj.x -= speed;

    for ( var n = 0; n < walls.length; n++) {
      while (collision(obj, walls[n])) {
        obj.x += speed;
      }
    }
    checkGold(obj);

  } else if (up2 === 1) {
    obj.y -= speed;

    for ( var o = 0; o < walls.length; o++) {
      while (collision(obj, walls[o])) {
        obj.y += speed;
      }
    }
    checkGold(obj);

  }
};

var checkGold = function(o) {
  for ( var m2 = 0; m2 < gold.length; m2++) {
      if (collision(o, gold[m2])) {
        if (gold[m2].show === 1) {
          o.g++;
          gold[m2].show = 0;
        }
      }
    }
};

var keyPressed = function() {
  if (keyCode === LEFT){
    left = 1;
    lastdirection = "left";
  } else if (keyCode === UP) {
    up = 1;
  } else if (keyCode === DOWN) {
    down = 1;
  } else if (keyCode === RIGHT) {
    right = 1;
    lastdirection = "right";
  } else if(keyCode === 87){
    up2 = 1;
  } else if(keyCode === 65){
    left2 = 1;
  } else if(keyCode === 68){
    right2 = 1;
  }else if(keyCode === 83){
    down2 = 1;
  }
};

var keyReleased = function() {
  if (keyCode === LEFT) {
    left = 0;
  } else if (keyCode === UP) {
    up = 0;
  } else if (keyCode === DOWN) {
    down = 0;
  } else if (keyCode === RIGHT) {
    right = 0;
  } else if(keyCode === 87){
    up2 = 0;
  }  else if(keyCode === 65){
    left2 =0;
  } else if(keyCode === 68){
    right2 = 0;
  }else if(keyCode === 83){
    down2 = 0;
  }
};

var collision = function(object1, object2) {
  if( object1.x + object1.w > object2.x &&
      object1.x < object2.x + object2.w &&
      object2.y + object2.h > object1.y &&
      object2.y < object1.y + object1.h){
        return true;
      } else {
        return false;
      }
};
