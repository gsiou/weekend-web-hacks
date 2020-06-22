var xoff = 0;

function Point(x,y,seed) {
  this.x = x;
  this.y = y;
  this.accel = 0.001;
  this.minVel = 0.0001;
  this.maxVel = 2;
  this.randomness = random(0, 30);
  this.history = [];

  this.move = function() {
    this.history.push(createVector(this.x, this.y));
    this.x = this.x + random(this.minVel, this.maxVel);
    this.y = y + map(noise(xoff+seed), 0, 1, -this.randomness, this.randomness);
    this.minVel += this.accel;
    this.maxVel += this.accel;
  }

  this.show = function() {
    stroke(255);
    strokeWeight(4);
    point(this.x, this.y);
    stroke(255, 100);
    let step = 32;
    for (let i = step; i < this.history.length; i+=step) {
      stroke(255, map(i-step, step, this.history.length, 0, 200));
      noFill();
      strokeWeight(1);
      let diffX = this.history[i].x - this.history[i-step].x;
      let rx = map(noise(xoff), 0, 1, -diffX/2, diffX/2);
      let diffY = this.history[i].y - this.history[i-step].y;
      let ry = map(noise(xoff), 0, 1, -diffY/2, diffY/2);
      line(this.history[i-step].x, this.history[i-step].y, this.history[i].x, this.history[i].y);
      line(this.history[i-step].x + rx, this.history[i-step].y + ry, this.history[i].x + rx, this.history[i].y + ry);
      line(this.history[i-step].x - rx, this.history[i-step].y - ry, this.history[i].x - rx, this.history[i].y - ry);
    }
  }
}

function Thingy(x, y) {
  this.p1 = new Point(x-50, y - 50, 0);
  this.p2 = new Point(x-50, y-random(50), 1000);
  this.p3 = new Point(x+random(50), y+random(50), 2000);
  this.p4 = new Point(x+50, y, 3000);

  this.show = function() {
    this.p1.show();
    this.p2.show();
    this.p3.show();
    this.p4.show();
    stroke(230);
    strokeWeight(3 + random(-1, 1));
    noFill();
    beginShape();
    vertex(this.p1.x, this.p1.y);
    vertex(this.p2.x, this.p2.y);
    vertex(this.p3.x, this.p3.y);
    vertex(this.p4.x, this.p4.y);
    endShape(CLOSE);
    this.p1.move();
    this.p2.move();
    this.p3.move();
    this.p4.move();
  }
}

// var p1, p2, p3, p4;
var thingies = [];

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);
  // p1 = new Point(0, 100, 0);
  // p2 = new Point(0, 150, 1000);
  // p3 = new Point(0, 200, 2000);
  // p4 = new Point(0, 250, 3000);
  // thingy1 = new Thingy(0, 150);
  // thingy2 = new Thingy(0, 300);
}

function mousePressed() {
  thingies.push(new Thingy(mouseX, mouseY));
}

function draw() {
  background(0);
  for(let i = 0; i < thingies.length; i++) {
    thingies[i].show();
  }
  // thingy1.show();
  // thingy2.show();
  if(thingies.length > 0 && thingies[0].p1.x > width + 100) {
    noLoop();
  }
  xoff += 0.1;
}