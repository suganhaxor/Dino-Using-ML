let snake;
let rez = 20;
let w;
let h;
let font, fontsize = 40;
let highscore = 0;
let generation = 0;
let total_population = 10000;
let score = 0;
let snakes = [];
let savedSnakes = [];
let best1 = 0;

function setup() {
    createCanvas(400, 400);
    textFont();
    textSize(fontsize);
    textAlign(RIGHT, RIGHT);
    w = floor(width / rez);
    h = floor(height / rez);
    for (let i = 0; i < total_population; i++)
        snakes.push(new Snake());
    frameRate(15);

}

function draw() {

    scale(rez);
    background(220);
    try {
        for (let k = 1; k < snakes.length; k++) {
            if (snakes[k].score > snakes[best1].score) {
                best1 = k;

            }
        }
        snakes[best1].show();
        console.log(snakes[best1].score);
    } catch (error) {

    };

    for (let i = 0; i < snakes.length; i++) {
        if (snakes[i].eat()) {
            snakes[i].food = snakes[i].createfood();
        }
        //snakes[i].show();
        snakes[i].update();
        snakes[i].think();
        if (snakes[i].endgame()) {
            savedSnakes.push(snakes.splice(i, 1)[0]);
            //savedSnakes.push(snakes[i]);
            if (score > highscore) {
                highscore = score;
            }
        }
    }
    if (snakes.length === 0) {
        generation += 1;
        snakes = newGeneration(savedSnakes);
        console.log('generation=', generation);

        b = 0;
    }

    /*  let best = snakes[0];
      for (let i = 1; i < snakes.length; i++) {
          if (snakes[i].score > best.score) {
              best = snakes[i];
          }
      }*/
    //console.log('best=', best.score);


}

function keyPressed() {
    //console.log(s)
    if (keyCode === UP_ARROW) {
        if (snakes[0].yspeed != 1)
            snakes[0].setDir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        if (snakes[0].yspeed != -1)
            snakes[0].setDir(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        if (snakes[0].xspeed != 1)
            snakes[0].setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        if (snakes[0].xspeed != -1)
            snakes[0].setDir(1, 0);
    } else if (key === 's') {
        noLoop();
    }
}