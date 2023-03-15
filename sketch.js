let numberOfLine = 20;
let dist;
let toothPicklen;

let lineStartPoints = [];
let lineEndPoints = [];

let totalToothPick = 0;
let intersectedToothpick = 0;

let para;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15);

  background(230);
  dist = height / numberOfLine;
  toothPicklen = dist / 2;

  for (let i = 0; i < numberOfLine; i++) {
    let f1 = createVector(5, i * dist);
    let f2 = createVector(width - 5, i * dist);
    lineStartPoints.push(f1);
    lineEndPoints.push(f2);
    line(f1.x, f1.y, f2.x, f2.y);
    stroke(200, 0, 20);
  }

}
function calculateIntersection(p1, p2, p3, p4) {
  var c2x = p3.x - p4.x; // (x3 - x4)
  var c3x = p1.x - p2.x; // (x1 - x2)
  var c2y = p3.y - p4.y; // (y3 - y4)
  var c3y = p1.y - p2.y; // (y1 - y2)

  // down part of intersection point formula
  var d = c3x * c2y - c3y * c2x;

  if (d == 0) {
    console.log("no");
    return false;
  } else {
    // upper part of intersection point formula
    var u1 = p1.x * p2.y - p1.y * p2.x; // (x1 * y2 - y1 * x2)
    var u4 = p3.x * p4.y - p3.y * p4.x; // (x3 * y4 - y3 * x4)

    // intersection point formula

    var px = (u1 * c2x - c3x * u4) / d;
    var py = (u1 * c2y - c3y * u4) / d;

    var p = { x: px, y: py };
    if (p.x >= p3.x && p.x <= p4.x) {
      if ((p1.y > p.y && p2.y > p.y) || (p1.y < p.y && p2.y < p.y))
        return false;
      else {
        return true;
      }
    } else return false;
  }
}

function draw() {



  for (let i = 0; i < 100; i++) {
    let c1 = createVector(random(width), random(height));
    let randomVec = p5.Vector.random2D();
    randomVec.normalize();
    randomVec.mult(toothPicklen);
    let c2 = p5.Vector.add(c1, randomVec);
    for (let i = 0; i < lineStartPoints.length; i++) {
      if (calculateIntersection(c1, c2, lineStartPoints[i], lineEndPoints[i])) {
        stroke(36, 200, 38);
        intersectedToothpick++;
      }
    }
    line(c1.x, c1.y, c2.x, c2.y);
    totalToothPick++;
    let p = intersectedToothpick / totalToothPick;
    let pi = (2 * toothPicklen) / (p * dist)
    document.getElementById("s").innerText = pi.toFixed(3);
    stroke(126);
  }
}

