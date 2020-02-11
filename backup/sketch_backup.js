let dino1;
let lineup = 50;
let stones = [];
let stone;
var dinoImage;
let b = 1;
let abstacle;
let abstacles = [];
let font, fontsize = 40;
let neuron;

function preload() {
    ///dinoImage = loadImage('dino.jpg');
    //font = loadFont('assets/SourceSansPro-Regular.otf');
}

function setup() {
    createCanvas(900, 480);
    textFont();
    textSize(fontsize);
    textAlign(RIGHT, RIGHT);
    dino1 = new Dino();
    stone = new Path();
    stone.getPosition();
    abstacle = new Cactus();
    neuron = new Neuralnetwork(4, 2, 1);
}

function draw() {
    background(240);
    for (let i of stones) {
        i.show();
        i.move();
        if (i.x <= 15) {
            stones.splice(0, 1);
        }
    }
    var ob = abstacles[0];
    console.log(abstacles);
    for (let i of abstacles) {
        i.show();

        let v = neuron.feedforward([dino1.velocityY, i.x, i.y, i.velocityX]);
        // console.log(v);

        if (dino1.hits(i)) {
            neuron.train([dino1.velocityY, i.x, i.y, i.velocityX], [0]);
            console.log('game over');
            // noLoop();
        } else {
            neuron.train([dino1.velocityY, i.x, i.y, i.velocityX], [1]);
        }

        if (i.x <= 0) {
            abstacles.splice(0, 1);
        }
        if (v >= 0.8) {
            jump();
        }
    }

    text(Math.floor(b * 0.2), width - 50, height - 400);
    b += 1;

    dino1.show();
    dino1.move();
    if (Math.random(1) < 0.05) {
        let s = new Path();
        s.getPosition();
        stones.push(s);
    }
    if (Math.random(1) < 0.009) {
        abstacles.push(new Cactus());
    }

}

function jump() {
    dino1.jump();
}

function keyPressed() {
    if (key === ' ') {
        dino1.jump();
    }
}