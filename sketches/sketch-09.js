const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  // dimensions: [ 1920, 2880 ],
  dimensions: [ 1280, 673 ],
};

let manager, image;

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 5;
  const cols = Math.floor(width  / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width  = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.save();
    typeContext.drawImage(image, 0, 0, cols, rows); // draw image
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;
    // typeContext.clearImage();

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);


    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell + random.range(-cell, cell) * 0.5;
      const y = row * cell + random.range(-cell, cell) * 0.5;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

    //   const glyph = getGlyph(r);

    //   context.font = `${cell * 2}px ${fontFamily}`;
    //   if (Math.random() < 0.1) context.font = `${cell * 5}px ${fontFamily}`;

    //   context.fillStyle = 'white';
      
    //   // context.strokeStyle = 'white';
    //   // context.lineWidth = width*0.00001;

    //   context.save();
    //   context.translate(x, y);
    //   context.translate(cell * 0.5, cell * 0.5);

    //   // context.fillRect(0, 0, cell, cell);

    //   context.fillText(glyph, 0, 0);

    //   // sz = Math.floor(random.range(10, 10));
    //   // context.beginPath();
    //   // context.rect(0, 0, sz, sz);
    //   // context.stroke();
      
    //   context.restore();
    // }
    
    // context.drawImage(typeCanvas, 0, 0);

      // Randomize cell size and stroke width
      const cellSize = random.rangeFloor(0, cell * 1.5);

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      context.beginPath();

      // context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      
      context.lineWidth = random.range(0, 2); // Random stroke width between 1 and 3
      // context.fillRect(0, 0, cell, cell); // Draw rectangle with image pixel color
      context.rect(0, 0, cellSize, cellSize); // Draw rectangle with image pixel color
      context.stroke();
      
      context.restore();
    }
    
    context.drawImage(typeCanvas, 0, 0);
  };
};




const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return '-';
  if (v < 150) return '—';
  if (v < 200) return '=';

  const glyphs = 'Шевченко'.split('');

  return random.pick(glyphs);
};


const onKeyUp = (e) => {
  // text = e.key.toUpperCase();
  // manager.render();
};

// document.addEventListener('keyup', onKeyUp);

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  // const url = './face.jpg';
  // const url = './face2.jpg';
  const url = './lips.jpeg';
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};



start();
