//---------Variables---------\\

var points = 0;
var userName = "Nolan";
var groundImage = loadImage("field.png");
var gemImage = loadImage("gem.png");
var keyImage = loadImage("key.png");
var doorImage = loadImage("door.png");
var wallImg = loadImage("stoneWall.png");

var player = {
              xpos:100,
              ypos:400,
              width:25,
              height:50,
              img:loadImage("steve.png")
             };

var keyNum = 0;

var startingX = 100;
var startingY = 400;

var keys = [{xpos:275,ypos:50,width:25,height:25,visible:true},
{xpos:425,ypos:425,width:25,height:25,visible:true}];

var doors = [{xpos:400,ypos:150,width:50,height:50,visible:true},
{xpos:150,ypos:250,width:50,height:50,visible:true}];

var wallsArray = [{xpos: 300, ypos: 0, width: 50, height: 200},
                  {xpos:150,ypos:150,width:50,height:100},
                  {xpos:150,ypos:300,width:50,height:200},
                  {xpos:150,ypos:150,width:250,height:50},
                  {xpos:100,ypos:300,width:50,height:50},
                  {xpos: 0, ypos: 0, width: 50, height: 500},
                  {xpos: 0, ypos: 450, width: 500, height: 50},
                  {xpos: 450, ypos: 0, width: 50, height: 500},
                  {xpos: 0, ypos: 0, width: 450, height: 50}];

var gemsArray = [{xpos: 50, ypos: 50, width: 25, height: 25, visible: true},
                {xpos: 350, ypos: 50, width: 25, height: 25, visible: true},
                {xpos: 250, ypos: 300, width: 25, height: 25, visible: true},
                {xpos: 300, ypos: 300, width: 25, height: 25, visible: true},
                {xpos: 350, ypos: 300, width: 25, height: 25, visible: true}];

var enemies = [{xpos: 50, ypos: 112, width: 25, height: 25, spd: 8, dir:"x"},
                {xpos: 112, ypos: 50, width: 25, height: 25, spd: 8, dir:"y"},
                {xpos: 250, ypos: 200, width: 25, height: 25, spd: 8, dir:"y"},
                {xpos: 300, ypos: 425, width: 25, height: 25, spd: -8, dir:"y"},
                {xpos: 350, ypos: 200, width: 25, height: 25, spd: 8, dir:"y"},];

var gemImage = loadImage("gem.png");
var wallImage = loadImage("wallImage.png");

var right = false;
var left = false;
var up = false;
var down = false;

//---------------------------\\


//--------Our Program--------\\

var draw = function() {

  image(groundImage);

  drawWalls();
  drawKeys();
  drawGems();
  drawDoors();
  drawPlayer();
  drawEnemies();
  movePlayer();
  moveEnemies();
  drawText();
};

//---------------------------\\


//--------Functions-----------\\

var collision = function(obj1, obj2) {
  if (obj1.xpos + obj1.width > obj2.xpos &&
      obj1.xpos < obj2.xpos + obj2.width &&
      obj1.ypos + obj1.height > obj2.ypos &&
      obj1.ypos < obj2.ypos + obj2.height) {
    return true;
  } else {
    return false;
  }
};

var drawKeys = function() {
  keys.filter(function(k) {return k.visible}).forEach(function(k) {
    image(keyImage,k.xpos,k.ypos,k.width,k.height);

    if (collision(k,player)) {
      k.visible = false;
      keyNum++;
    }
  });
};

var drawDoors = function() {
  doors.filter(function(k) {return k.visible}).forEach(function(k) {
    image(doorImage,k.xpos,k.ypos,k.width,k.height);
  });
};

var drawEnemies = function() {
  fill(255,0,0);

  var i = 0;
  while(i < enemies.length) {
    rect(enemies[i].xpos,enemies[i].ypos,enemies[i].width,enemies[i].height);
    i+=1;
  }
};

var resetPlayer = function() {
  player.xpos = startingX;
  player.ypos = startingY;

  keyNum = 0;

  keys.forEach(function(k) {
    k.visible = true;
  });

  doors.forEach(function(k) {
    k.visible = true;
  });



  gemsArray.filter(function(g) {return !g.visible}).forEach(function(g) {
    g.visible = true;
    points-=50;
  });
};

var moveEnemies = function() {

  var j = 0;
  while(j < enemies.length) {
    if (enemies[j].dir === "x") {
      enemies[j].xpos += enemies[j].spd;
    } else {
      enemies[j].ypos += enemies[j].spd;
    }
    var i = 0;
    while(i < wallsArray.length) {

      if (collision(enemies[j], wallsArray[i])) {
        enemies[j].spd = enemies[j].spd * -1;
        break;
      }
      i+=1;
    }

    if (collision(enemies[j],player)) {
      resetPlayer();
    }

    j+=1
  }

};

var drawWalls = function() {
  fill(255,150,0);

  var n = 0;
  while(n < wallsArray.length) {
    for(let i = 0; i<wallsArray[n].width; i+=50) {
      for (let j = 0; j < wallsArray[n].height; j+=50) {
        image(wallImg,wallsArray[n].xpos + i,
         wallsArray[n].ypos + j,
         50,
         50);
      }
    }

    n += 1;
  }
};


var drawPlayer = function() {
  image(player.img,player.xpos, player.ypos, player.width, player.height);
};

var movePlayer = function() {



   if (right) {
    player.xpos += 6;

    let i = 0;

    while(i < wallsArray.length) {
      while (collision(player, wallsArray[i])) {
        player.xpos -= 1;
      }

      i+=1;
    }
    i = 0;
    while(i < doors.length) {
      while (collision(player, doors[i]) && doors[i].visible) {
        if (keyNum > 0) {
          keyNum--;
          doors[i].visible = false;
        } else {
          player.xpos -= 1;
        }
      }

      i+=1;
    }
  }
  if (left) {
    player.xpos -= 6;
    let i = 0;
    while(i < wallsArray.length) {
      while (collision(player, wallsArray[i])) {
        player.xpos += 1;
      }

      i+=1;
    }
    i = 0;
    while(i < doors.length) {
      while (collision(player, doors[i]) && doors[i].visible) {
        if (keyNum > 0) {
          keyNum--;
          doors[i].visible = false;
        } else {
          player.xpos += 1;
        }
      }

      i+=1;
    }
  }
  if (up) {
    player.ypos -= 6;
    let i = 0;
    while(i < wallsArray.length) {
      while (collision(player, wallsArray[i])) {
        player.ypos += 1;
      }

      i+=1;
    }
    i = 0;
    while(i < doors.length) {
      while (collision(player, doors[i]) && doors[i].visible) {
        if (keyNum > 0) {
          keyNum--;
          doors[i].visible = false;
        } else {
          player.ypos += 1;
        }
      }

      i+=1;
    }
  }
  if (down) {
    player.ypos += 6;
    let i = 0;
    while(i < wallsArray.length) {
      while (collision(player, wallsArray[i])) {
        player.ypos -= 1;
      }

      i+=1;
    }
    i = 0;
    while(i < doors.length) {
      while (collision(player, doors[i]) && doors[i].visible) {
        if (keyNum > 0) {
          keyNum--;
          doors[i].visible = false;
        } else {
          player.ypos -= 1;
        }
      }

      i+=1;
    }
  }

  player.xpos = max(min(player.xpos,475),0);
  player.ypos = max(min(player.ypos,450),0);
}
var drawGems = function() {
  var g = 0;
  while (g < gemsArray.length) {
    if (gemsArray[g].visible) {
      image(gemImage,
            gemsArray[g].xpos,
            gemsArray[g].ypos,
            gemsArray[g].width,
            gemsArray[g].height);
    }

    if (collision(player, gemsArray[g]) && gemsArray[g].visible) {
      gemsArray[g].visible = false;
      points += 50;
    }
    g+=1;
  }
}

var keyPressed = function() {
  if (keyCode === RIGHT) {
    right = true;
  }
  if (keyCode === LEFT) {
    left = true;
  }
  if (keyCode === UP) {
    up = true;
  }
  if (keyCode === DOWN) {
    down = true;
  }
};

var keyReleased = function() {
  if (keyCode === RIGHT) {
    right = false;
  }
  if (keyCode === LEFT) {
    left = false;
  }
  if (keyCode === UP) {
    up = false;
  }
  if (keyCode === DOWN) {
    down = false;
  }
};

var drawText = function() {
  fill(255);
  textAlign(CENTER);
  textSize(12);
  text(userName,player.xpos+player.width/2,player.ypos-20);
  text("(" + player.xpos + ", " + player.ypos + ")",player.xpos+player.width/2,player.ypos-5);
  textAlign(LEFT);
  textSize(16);
  text("Points: " + points,15,485);
  text("Keys: " + keyNum,405,485);
};
