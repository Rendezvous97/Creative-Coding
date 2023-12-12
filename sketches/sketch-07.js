const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const params = {
  message: 'A',
  theme: 'dark',
};

let manager;

let text = params.message;
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d', { willReadFrequently: true });

const sketch = ({ context, width, height }) => {

  const cell = 20;
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = params.theme === 'dark' ? 'black' : 'white';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols;

    // typeContext.font = '1200px serif';
    // typeContext.font = fontSize + "px " + fontFamily;
    typeContext.fillStyle = params.theme === 'dark' ? 'white' : 'black';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';
    
    const metrics = typeContext.measureText(params.message);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (typeCanvas.width - mw)*0.5 - mx;
    const ty = (typeCanvas.height - mh)*0.5 - my;

    typeContext.save()
    typeContext.translate(tx, ty);

    // typeContext.beginPath();
    // typeContext.rect(mx, my, mw, mh);
    // typeContext.stroke();

    typeContext.fillText(params.message, 0, 0);
    console.log(typeContext.fillStyle);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    // console.log(typeData);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    // context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = params.theme === 'dark' ? 'black' : 'white';
    context.fillRect(0, 0, width, height);


    for (let i =0; i <numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      // const glyph = getGlyph(r);
      const glyph = params.theme === 'dark' ? getGlyph(r) : getAntiGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;
      

      // context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillStyle = params.theme === 'dark' ? 'white' : 'black';

      context.save();
      context.translate(x, y);
      // context.fillRect(0, 0, cell, cell);
      // context.beginPath();
      context.translate(cell*0.5, cell*0.5);
      context.fillText(glyph, 0, 0);
      // context.fill();
      context.restore();

    }
  };
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '+';

  const glyphs = '_= /'.split('');

  return random.pick(glyphs);
}

const getAntiGlyph = (v) => {
  if (v > 50) return '';
  if (v > 100) return '.';
  if (v > 150) return '-';
  if (v > 200) return '+';

  const glyphs = '_= /'.split('');

  return random.pick(glyphs);
}

// const onKeyUp = (e) => {
//   text = e.key.toUpperCase();
//   manager.render();
//   // console.log(text);
// }

// document.addEventListener('keyup', onKeyUp);


const createPane = () => {
  const pane = new Tweakpane.Pane()

  let folder;

  folder = pane.addFolder({title: 'Parameters'});
  const messageInput = folder.addInput(params, 'message');

  messageInput.on('change', () => {
    text = params.message; // Update the text variable
    manager.render(); // Trigger a re-render of the canvas
  });

  // folder = pane.addFolder({title: 'Theme'});
  const themeInput = folder.addInput(params, 'theme', {options: {dark: 'dark', light: 'light'}})
  themeInput.on('change', () => {
    // text = params.message; // Update the text variable
    manager.render(); // Trigger a re-render of the canvas
  });
}

createPane();


const start = async () => {
  manager = await canvasSketch(sketch, settings);
}


start();

