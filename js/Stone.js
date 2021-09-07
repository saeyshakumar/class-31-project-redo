class Stone
{
  constructor(x, y, w,h) 
  {
    let options = {
    restitution:0.8
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    translate (pos.x, pos.y)
    ellipseMode(CENTER);
    noStroke();
    fill("white");
    ellipse(0,0, this.w, this.h);
    pop();
  }
}