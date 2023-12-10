const canvasSketch = require('canvas-sketch');
const { mapRange } = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  // timeScale: 0.2,

  // dimensions: 'A4',
  // pixelsPerInch: 300,
  // orientation: 'landscape'
};


const params = {
  speed : 10,
}

const sketch = () => {
  return ({ context, width, height, frame }) => {

    let speed = params.speed;

    speed = Math.floor(mapRange(speed, 1, 30, 30, 1));
    console.log(speed);

    if (frame % speed === 0) {
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);
      context.strokeStyle = 'white';
      context.lineWidth = width * 0.01;
      
      const gap = width * 0.03;
      const w = width * 0.10;
      const h = height * 0.10;
      const ix = width * 0.17;
      const iy = height * 0.17;
      const off = width * 0.02;
      let x, y;

      for (let i=0; i<5; i++){
        for (let j=0; j<5; j++){
            x=ix + (w + gap)*i;
            y=iy + (h + gap)*j;

            context.save();
            context.beginPath();
            context.rect(x, y, w, h);
            context.stroke();
            context.restore();
    
            let noise = Math.random();

            if(noise > 0.5){
                context.save();
                context.beginPath();
                context.rect(x + off, y + off, w - (off*2), h - (off*2));
                // context.strokeStyle = 'yellow';
                context.stroke();
                context.restore();
            }
          //   else if (noise < 0.1){
          //     context.save();
          //     context.beginPath();
          //     // context.rect(x + off, y + off, w - (off*2), h - (off*2));
          //     context.arc(x + w/2, y + h/2, (w - (off*2))/2, 0, (Math.PI/180)*360);
          //     // context.strokeStyle = 'red';
          //     context.stroke();
          //     context.restore();
          // }
        }
    }
    };
    }
    
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title:'Parameters'});
  folder.addInput(params, "speed", {min:1, max:30});

}

createPane();


canvasSketch(sketch, settings);
