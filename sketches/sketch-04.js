const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate : true
};


// const animate = () => {
//   console.log('domestica');
//   requestAnimationFrame(animate);
// };

// animate();

const params = {
  totalAgents : 40,
}

const sketch = ({context, width, height}) => {

  agents = []
  numAgents = 60;

  for (let i = 0; i < params.totalAgents; i++){
    const x = random.range(0, width);
    // console.log(x);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // context.clearRect(0, 0, width, height);

    // const agentA = new Agent(800, 400);
    // const agentB = new Agent(300, 700);

    // agentA.draw(context);
    // agentB.draw(context);


    for(let i = 0; i< params.totalAgents; i++){
      const agent = agents[i];

      for (j = i+1; j < params.totalAgents; j++){
        const other = agents[j]

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(element => {
      element.update();
      element.draw(context);
      // element.bounce(width, height);
      element.wrap(width, height);
    });

  };
};


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance (v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.hypot(dx, dy);
  }
}

class Agent {
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-0.5, 0.5), random.range(-0.5, 0.5));
    this.radius = random.range(4, 12);
  }

  bounce (width, height){
    if (this.pos.x <= 0 || this.pos.x >= width){
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height){
      this.vel.y *= -1;
    }
  }

  wrap (width, height){
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw (context){

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    // context.fillStyle = 'black';
    context.fill();
    context.stroke();
    context.restore();
  }
}



const createPane = () => {
  const pane = new Tweakpane.Pane();

  let folder;

  folder = pane.addFolder({title:'Parameters'});
  folder.addInput(params, 'totalAgents', {min:2, max: 200, step:1});
}

createPane();


canvasSketch(sketch, settings);