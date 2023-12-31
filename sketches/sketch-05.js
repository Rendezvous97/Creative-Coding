const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

// import math from 'canvas-sketch-util/math';
// import random from 'canvas-sketch-util/random'
// import canvasSketch from 'canvas-sketch';
// import Tweakpane from 'tweakpane';



const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  animate: true,
  frame: 0,
  lineCap: 'butt',
  theme: 'dark',
}

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: params.animate,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = params.theme === 'dark' ? 'black' : 'white';
    console.log(context.fillStyle);
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;

    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

  
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        const x = j * cellw;
        const y = i * cellh;
        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const f = params.animate ? frame : params.frame;

        // const n = random.noise2D(x + frame * 10, y, params.freq);

        const n = random.noise3D(x, y, f * 10, params.freq);

        const angle = n * Math.PI * params.amp;
        const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

        context.save();
        context.translate(margx, margy);
        context.translate(x, y);
        context.translate(cellw/2, cellh/2);
        context.rotate(angle);
        context.lineWidth = scale;
        context.lineCap = params.lineCap;
        // context.strokeStyle = 'white';
        context.strokeStyle = params.theme === 'dark' ? 'white' : 'black';
        
        context.beginPath();
        context.moveTo(-w * 0.5, 0);
        context.lineTo(w * 0.5, 0);
        context.stroke();
        context.restore();
        
      }
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane()

  let folder;

  folder = pane.addFolder({title: 'Grid'});
  folder.addInput(params, 'lineCap', {options : {butt:'butt', round:'round', square:'square'}});
  folder.addInput(params, 'cols', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'rows', {min: 2, max: 50, step: 1});
  folder.addInput(params, 'scaleMin', {min: 1, max: 100});
  folder.addInput(params, 'scaleMax', {min: 1, max: 100});

  folder = pane.addFolder({title: 'Noise'});
  folder.addInput(params, 'freq', {min: -0.01, max: 0.01});
  folder.addInput(params, 'amp', {min: 0, max: 1});
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', {min: 0, max: 999});

  folder = pane.addFolder({title: 'Theme'});
  folder.addInput(params, 'theme', {options: {dark: 'dark', light: 'light'}})
}

createPane();
canvasSketch(sketch, settings);
