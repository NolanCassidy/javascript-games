var ran = 2;//ceil(random(7));
var rows = 70;
var col = 30;
var placement;
var curBlock;
var x, y;
var timer, tickSpeed;
var grid = [];

size(col * 10, rows * 10);

var setup = function() {
  x = 150;
  y = 0;
  timer = millis();
  tickSpeed = 750;
  placement = [];
  background(255);
  generateBlock(ran);

  for(var r = 0; r < rows; r++){
    grid.push([]);
    for(var c = 0; c < col; c++) {
      grid[r].push({x: r * 25, y: c * 25, w: 25, h: 25, color: color(255)});
    }
  }

};

var draw = function(){

  if(millis() - timer >= tickSpeed){
    background(255);

    noStroke();
    for(var r = 0; r < rows; r++){
      for(var c = 0; c < col; c++) {
        fill(grid[r][c].color);
        rect(grid[r][c].x,grid[r][c].y, grid[r][c].w, grid[r][c].h);
      }
    }

    stroke(0);
    fill(curBlock.color)
    drawBlocks();
    //moveBlocks();
    timer = millis();
  }

};

var drawBlocks = function(){
  for(var i = 0; i < curBlock.x.length; i++) {
    rect(curBlock.x[i], curBlock.y[i], 25, 25);
  }
};

var moveBlocks = function(){
  for(var i = 0; i < curBlock.x.length; i++) {

    if(curBlock.y[i] < 675) {
        curBlock.y[i]+=25;
      } else {
        placement.push(curBlock);
    }
  }
};

var generateBlock = function(num){

  var color = color(random(255), random(255), random(255));
  switch(num){

    case 1 :
      curBlock = {
        x: [x - 50, x - 25, x, x + 25],
        y: [y, y, y, y],
        color: color
      };
      break;
    case 2 :
      curBlock = {
        x: [x - 25, x, x, x + 25],
        y: [y, y + 25, y, y],
        color: color
      };
      break;
  }
};

var rotateBlock = function(){
  var xStart = curBlock.x[0];
  var yStart = curBlock.y[0];

  for(var i in curBlock.x){
    var yDif = curBlock.y[i] - yStart;
    var xDif = curBlock.x[i] - xStart;

    curBlock.y[i] = yStart + xDif;
    curBlock.x[i] = xStart + yDif;
  }
};

var keyPressed = function(){
  if(keyCode === LEFT) {
    for(var i = 0; i < curBlock.x.length; i++) {
      curBlock.x[i] -= 25;
    }
  }
  if(keyCode === RIGHT) {
    for(var i = 0; i < curBlock.x.length; i++) {
      curBlock.x[i] += 25;
    }
  }
  if(keyCode === UP) {
    rotateBlock();
  }
  background(0);
  drawBlocks();
};
