const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true
};

// const degToRad = (deg) => {
//   return deg*(Math.PI/180);
// };

// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// }


const params = {
  strokes: 50,
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';
  

    const num = params.strokes;

    const cx = width*0.5;
    const cy = width*0.5;
    // const cx = 0;
    // const cy = 0;

    const w = width*0.01;
    const h = width*0.1;
    const r = width*0.35;
    let x, y;


    for (let i=0; i<num; i++){

      const slice = math.degToRad(360/num);
      const angle = slice*i;

      x = cx + r * Math.sin(angle);
      // console.log(x);
      y = cy + r * Math.cos(angle);
      // console.log(y);

      // context.beginPath();
      // context.fillRect(x, y, w, h);
      context.save();
      context.translate(x, y);
      context.rotate(-angle);

      // context.scale(randomRange(1, 3),1);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w*0.5, random.range(1, -h*0.5), w, h);
      context.fill();
      context.restore();


      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, r * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 10));
      context.stroke();
      context.restore();

      // Clock Center

      context.save();
      context.translate(cx, cy);
      // context.rotate(-angle);
      // context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, r*0.05, 0, math.degToRad(360));
      
      context.fillStyle = 'black';
      context.fill();
      context.stroke();
      context.restore();

      // Hour hand
      context.save();
      context.translate(cx, cy);
      // context.rotate(-angle);
      // context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.rect(-9*0.5, 0, 9, 80);
      
      context.fillStyle = 'black';
      context.fill();
      context.stroke();
      context.restore();

      // Minute hand
      context.save();
      context.translate(cx, cy);
      context.rotate(math.degToRad(120));
      // context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.rect(-5*0.5, 0, 5, 150);
      
      context.fillStyle = 'black';
      context.fill();
      context.stroke();
      context.restore();



    }
  };
};


const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title:'Parameters'});
  folder.addInput(params, "strokes", {min:5, max:100, step:1});

}

createPane();

canvasSketch(sketch, settings);
