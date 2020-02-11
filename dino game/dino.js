function mutate(x) {
    if (random(1) < 1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Dino {
    constructor(brain) {
        this.r = 40;
        this.x = 35;
        this.low = 10;
        this.h = this.r + lineup;
        this.y = height - this.h;
        this.velocityY = 0;
        this.gravity = 2.5;
        this.score = 0;
        this.fitness = 0;
        this.speed = 4;
        if (brain instanceof Neuralnetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new Neuralnetwork(6, 100, 3);
        }
    }
    copy() {
        return new Dino(this.brain);
    }
    show() {
       // image(dinoImage, this.x, this.y + this.r /2, this.r, this.r);
        rect(this.x, this.y + this.low, this.r, this.r);
    }

    jump() {
        if (this.y == height - this.h) {
            this.velocityY = -28;
        }
    }
    hits(a) {
        return collideRectRect(this.x, this.y, this.r, this.r, a.x, a.y - a.absHeight / 2, a.r, a.absHeight);
    }
    forward() {
        this.x += this.speed;
    }
    backward() {
        this.x -= this.speed;
    }
    move() {
        this.score += 1;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.y = constrain(this.y, 0, height - this.h);
    }
    think(cactus) {
        let inputs = [];
        let nearest = null;
        let nearestD = Infinity;
        for (let i = 0; i < cactus.length; i++) {
            let d = cactus[i].x - this.x;
            if (d < nearestD && d > 0) {
                nearest = cactus[i];
                nearestD = d;
            }
        }
        try {
            inputs[0] = nearest.x / width;
            inputs[1] = nearest.y / height;
            inputs[2] = nearest.absHeight / height;
            inputs[3] = this.x / width;
            inputs[4] = this.y / height;
            inputs[5] = this.r / width;
			
            let output = this.brain.feedforward(inputs);
            if (output[0] > 0.9) {
                this.jump();
            }
            if (output[1] > 0.9 && this.x > 35) {
                this.backward();
            }
            if (output[2] > 0.9 && this.y < width) {
                this.forward();
            }
        } catch (err) {

        }
    }

}