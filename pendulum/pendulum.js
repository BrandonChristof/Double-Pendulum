// Multi-Pendulum

function changeColour() {
    var p = document.getElementsByClassName("pendulum");
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    p[0].style.stroke = "#" + randomColor;
}

function Pendulum(r, m, a, v, acc, tx, ty, bx, by, e){
    this.radius = r;
    this.mass = m;
    this.angle = a;
    this.vel = v;
    this.accel = acc;
    this.tx = tx;
    this.ty = ty;
    this.bx = bx;
    this.by = by;
    this.elem = e;
}

function startPendulum() {
    w = screen.width;
    h = screen.height;
    
    var element = document.getElementsByClassName('pendulum');
    element[0].style.width = w + "px";
    element[0].style.height = h + "px";
    
    rootX = w/2;
    rootY = 200;

    var numOfPendulums = 2;
    var elem1 = document.getElementById("p1");
    var elem2 = document.getElementById("p2");

    var pendArray = [];
    
    pendArray[0] = new Pendulum(120, 2, Math.PI/2, 0.001, 0, 0, 0, 0, 0, null);
    pendArray[1] = new Pendulum(135, 1, Math.PI/2, 0.001, 0, 0, 0, 0, 0, null);

    pendArray[0].elem = elem1;
    pendArray[1].elem = elem2;
    
    pendArray[0].tx = rootX;
    pendArray[0].ty = rootY;
    pendArray[0].bx = pendArray[0].tx + (pendArray[0].radius * Math.cos(pendArray[0].angle - Math.PI/2));
    pendArray[0].by = pendArray[0].ty + (pendArray[0].radius * Math.sin(pendArray[0].angle - Math.PI/2));

    pendArray[1].tx = pendArray[0].bx;
    pendArray[1].ty = pendArray[0].by;
    pendArray[1].bx = pendArray[1].tx + (pendArray[1].radius * Math.cos(pendArray[1].angle - Math.PI/2));
    pendArray[1].by = pendArray[1].ty + (pendArray[1].radius * Math.sin(pendArray[1].angle - Math.PI/2));

    pendArray[1].elem.x1.baseVal.valueAsString = pendArray[1].tx;
    pendArray[1].elem.y1.baseVal.valueAsString = pendArray[1].ty;
    pendArray[1].elem.x2.baseVal.valueAsString = pendArray[1].bx;
    pendArray[1].elem.y2.baseVal.valueAsString = pendArray[1].by;

    var id = setInterval(frame, 10);

    var fname = document.getElementById("firstname");
    var lname = document.getElementById("lastname");
    
    decay = 1;

    function frame() {
        
        updateAccelerations(pendArray[0], pendArray[1]);
        
        //changeColour();

        for (var v = 0; v<numOfPendulums; v++){
            pendArray[v].vel += pendArray[v].accel;
            pendArray[v].angle += pendArray[v].vel;
        }
        
        pendArray[0].vel *= decay;
        newPosition(pendArray[0], pendArray[0].tx, pendArray[0].ty, fname);
        
        pendArray[1].vel *= decay;
        newPosition(pendArray[1], pendArray[0].bx, pendArray[0].by, lname);
        
    }
}

function newPosition(p, px, py, b){

    p.tx = px;
    p.ty = py;
    p.bx = p.tx + (p.radius * (Math.cos(p.angle + Math.PI/2)));
    p.by = p.ty + (p.radius * (Math.sin(p.angle + Math.PI/2)));

    p.elem.x1.baseVal.valueAsString = p.tx;
    p.elem.y1.baseVal.valueAsString = p.ty;
    p.elem.x2.baseVal.valueAsString = p.bx;
    p.elem.y2.baseVal.valueAsString = p.by;

    b.style.left = p.bx - 55 + "px";
    b.style.top = p.by - 0 + "px";

}

function updateAccelerations(pend1, pend2, g=0.12){
    
    m1 = pend1.mass;
    m2 = pend2.mass;
    
    a1 = pend1.angle;
    a2 = pend2.angle;
    
    l1 = pend1.radius;
    l2 = pend2.radius;
    
    v1 = pend1.vel;
    v2 = pend2.vel;
    
    
    x = -g * ((2 * m1) + m2) * Math.sin(a1);
    y = m2 * g * Math.sin(a1 - (2 * a2));
    z = 2 * Math.sin(a1-a2) * m2 * ((v2 * v2 * l2) + (v1 * v1 * l1 * Math.cos(a1 - a2)));
    denom = l1 * (2*m1 + m2 - m2 * Math.cos((2*a1) - (2*a2)));

    acc1 = (x - y - z) / denom;

    x = 2 * Math.sin(a1-a2);
    y = (v1*v1*l1*(m1-m2)) + g*(m1 + m2) * Math.cos(a1) + v2*v2*l2*m2*Math.cos(a1-a2);
    z = x * y;
    den1 = l2 * (2*m1 + m2 - m2 * Math.cos(2*a1 - 2*a2));

    acc2 = z / denom;

    pend1.accel = acc1;
    pend2.accel = acc2;
}


window.onload=function(){
   startPendulum();
};

