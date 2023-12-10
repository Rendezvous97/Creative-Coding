// const canvasSketch = require('canvas-sketch');
// const math = require('canvas-sketch-util/math');
// const random = require('canvas-sketch-util/random');

// const settings = {
//   dimensions: [ 1080, 1080 ]
// };

// // const degToRad = (deg) => {
// //   return deg*(Math.PI/180);
// // };

// // const randomRange = (min, max) => {
// //   return Math.random() * (max - min) + min;
// // }


// const sketch = () => {
//   return ({ context, width, height }) => {
//     // context.fillStyle = 'white';
//     context.fillRect(0, 0, width, height);
//     context.fillStyle = 'black';
//     // context.strokeStyle = 'white';

//     const num = 50;

//     const cx = width*0.5;
//     const cy = width*0.5;
//     // const cx = 0;
//     // const cy = 0;

//     const w = width*0.01;
//     const h = width*0.1;
//     const r = width*0.32;
//     let x, y;


//     for (let i=0; i<num; i++){

//       const slice = math.degToRad(360/num);
//       const angle = slice*i;

//       x = cx + r * Math.sin(angle);
    
//       y = cy + r * Math.cos(angle);

//       context.save();
//       context.translate(x, y);
//       context.rotate(-angle);

//       // context.scale(randomRange(1, 3),1);
//       context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

//       context.beginPath();
//       context.rect(-w*0.5, random.range(1, -h*0.5), w, h);
//       context.fill();
//       context.restore();


//       context.save();
//       context.translate(cx, cy);
//       context.rotate(-angle);

//       context.lineWidth = random.range(5, 20);
//       // context.strokeStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(
//       //   255 - 42.5 * i,
//       // )})`;

//       context.strokeStyle = `rgb(${Math.floor(255 - (255 * i / num))}, 255, ${Math.floor(255 * i / num)})`;

//       // console.log(`rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(
//       //   255 - 42.5 * i,
//       // )})`);

//       context.beginPath();
//       context.arc(0, 0, r * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 8));
//       context.stroke();
//       context.restore();


//     }
//   };
// };

// canvasSketch(sketch, settings);



/////// NEW

const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

class Ticks {
  constructor (cx, cy, w, h, radius, i, num){
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.radius = radius;
    this.i = i;
    this.num = num;

    this.slice = math.degToRad(360/this.num);
    this.angle = this.slice*this.i;

    this.x = this.cx + this.radius * Math.sin(this.angle);
  
    this.y = this.cy + this.radius * Math.cos(this.angle);

    this.randomHeight = random.range(1, -this.h*0.5);

    this.scaleMin = random.range(0.1, 2);
    this.scaleMax = random.range(0.2, 3);

    this.arcRadius = random.range(0.1, 1.4);
    this.sAngle = random.range(1, -8);
    this.eAngle = random.range(1, 8);
    this.arcLineWidth = random.range(1, 15);
  }

  draw (context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(-this.angle);

    context.scale(this.scaleMin, this.scaleMax);
    context.fillStyle = `rgb(${Math.floor(255 - (255 * this.i / this.num))}, 255, ${Math.floor(255 * this.i / this.num)})`;
    // context.fillStyle = 'white';
    // context.stroke();

    context.beginPath();
    context.rect(-this.w*0.5, this.randomHeight, this.w, this.h);
    context.fill();
    context.restore();

    ///
    context.save();
    context.translate(this.cx, this.cy);
    context.rotate(this.angle);

    context.lineWidth = this.arcLineWidth;

    context.strokeStyle = `rgb(${Math.floor(255 - (255 * this.i / this.num))}, 255, ${Math.floor(255 * this.i / this.num)})`;

    context.beginPath();
    // context.arc(0, 0, this.radius * this.arcRadius, this.slice * this.sAngle, this.slice * this.eAngle);
    context.arc(0, 0, this.radius * this.arcRadius, this.slice * this.sAngle, this.slice * this.eAngle);
    context.stroke();
    context.restore();
  }

  update(){
    this.angle += math.degToRad(params.speed);
    this.x = this.cx + this.radius * Math.sin(this.angle);
    this.y = this.cy + this.radius * Math.cos(this.angle);
  }
}


const params = {
  speed: 0.1,
}

const sketch = ({ context, width, height }) => {

  const num = 25;

  const cx = width*0.5;
  const cy = width*0.5;
  const w = width*0.01;
  const h = width*0.1;
  const r = width*0.26;
  let x, y;

  ticks = [];

  for (let i=0; i<num; i++){

    ticks.push(new Ticks(cx, cy, w, h, r, i, num));
    // context.save();
    // context.translate(cx, cy);
    // context.rotate(-angle);

    // context.lineWidth = random.range(5, 20);

    // context.strokeStyle = `rgb(${Math.floor(255 - (255 * i / num))}, 255, ${Math.floor(255 * i / num)})`;

    // context.beginPath();
    // context.arc(0, 0, r * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 8));
    // context.stroke();
    // context.restore();


  }
  return ({ context, width, height }) => {
    // context.fillStyle = 'white';
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // context.clearRect(0, 0, width, height);
  

    ticks.forEach(element => {
      element.update();
      element.draw(context);
    });
  };
};




const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title:'Parameters'});
  folder.addInput(params, "speed", {min:0.05, max:3.0});

}

createPane();

canvasSketch(sketch, settings);






































// NEW

// const canvasSketch = require('canvas-sketch');
// const math = require('canvas-sketch-util/math');
// const random = require('canvas-sketch-util/random');

// const settings = {
//   dimensions: [1080, 1080],
//   animate: true
// };

// // ... [rest of the code] ...
// class ClockTick {
//   constructor(cx, cy, radius, angle, length, width) {
//     this.cx = cx;
//     this.cy = cy;
//     this.radius = radius;
//     this.angle = angle;
//     this.length = random.range(10, 30); // Random length between 10 and 30
//     this.width = random.range(3, 10);  
//   }

//   draw(context) {
//     context.save();
//     context.translate(this.cx, this.cy);
//     context.rotate(this.angle);
//     context.beginPath();
//     context.rect(-this.width / 2, -this.radius, this.width, this.length);
//     context.fill();
//     context.restore();
//   }

//   update() {
//     // Update the angle for rotation
//     this.angle += math.degToRad(0.1); // Adjust the speed of rotation here
//   }
// }

// const sketch = ({ context, width, height }) => {
//   let ticks = [];
//   const cx = width / 2;
//   const cy = height / 2;
//   const radius = width * 0.3; // Adjust as needed
//   const numTicks = 20;

//   for (let i = 0; i < numTicks; i++) {
//     const angle = math.degToRad(360 / numTicks * i);
//     ticks.push(new ClockTick(cx, cy, radius, angle, 20, 5)); // Adjust length and width as needed
//   }

//   return ({ context }) => {
//     context.fillStyle = 'black';
//     context.clearRect(0, 0, width, height);

//     ticks.forEach(tick => {
//       tick.update();
//       tick.draw(context);
//     });
//   };
// };

// canvasSketch(sketch, settings);
