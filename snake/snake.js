function mutate(x) {
    if (random(1) < 0.8) {
        let offset = randomGaussian() * 0.5;
        let mutated = offset + x;
        return mutated;
    }
    return x;
}


class Snake {
    constructor(brain) {

        this.body = [];
        this.body[0] = createVector(floor(random(w)), floor(random(h)));
        this.xspeed = 0;
        this.fitness = 0;
        this.yspeed = 0;
        this.maxstep = 100;
        this.steps = this.maxstep;
        this.food = this.createfood();
        this.score = 0;
        if (brain instanceof Neuralnetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new Neuralnetwork(21, 16, 4);
        }
    }
    grow() {
        let head = this.body[this.body.length - 1];
        this.body.push(head);
    }
    setDir(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
    endgame() {
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        if (x < 0 || x > w - 1 || y < 0 || y > h - 1 || this.steps <= 0) {
            return true;
        }
        for (let i = 0; i < this.body.length - 1; i++) {
            let head = this.body[0];
            if (head.x == x && head.y == y) {
                return true;
            }
        }
        return false;
    }

    copy() {
        return new Snake(this.brain);
    }


    eat() {
        let head = this.body[this.body.length - 1];
        if (head.x == this.food.x && head.y == this.food.y) {
            this.grow();
            let val = this.maap(this.steps, 1, 60 * 60, 1, 100);
            //this.score += 100 - val;
            this.score += 1;
            this.steps += this.maxstep;
            this.food = this.createfood();
            return true;

        }
        return false;
    }

    update() {
        this.steps -= 1;
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();

        head.x += this.xspeed;
        head.y += this.yspeed;
        this.body.push(head);
    }
    show() {
        for (let i = 0; i < this.body.length; i++) {
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1);

        }

        fill(255, 0, 0);
        noStroke();

        rect(this.food.x, this.food.y, 1, 1);
    }
    getAfter(x, y) {
        let value = [];
        let index = 0;
        if (x < 0 || x > width || y < 0 || y > height) {
            value[index] = 1;
        } else {
            value[index] = 0;
        }
        index++;
        if (this.food.x === x && this.food.y === y) {
            value[index] = 1;

        } else {
            value[index] = 0;
        }
        index++;
        return value;
    }
    info() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        let value = [];
        let ret;
        ret = this.getAfter(x + 1, y);
        value[0] = ret[0];
        value[1] = ret[1];
        ret = this.getAfter(x, y + 1);
        value[2] = ret[0];
        value[3] = ret[1];
        ret = this.getAfter(x - 1, y);
        value[4] = ret[0];
        value[5] = ret[1];
        ret = this.getAfter(x, y - 1);
        value[6] = ret[0];
        value[7] = ret[1];
        ret = this.getAfter(x + 1, y + 1);
        value[8] = ret[0];
        value[9] = ret[1];
        ret = this.getAfter(x + 1, y - 1);
        value[10] = ret[0];
        value[11] = ret[1];
        ret = this.getAfter(x - 1, y + 1);
        value[12] = ret[0];
        value[13] = ret[1];
        ret = this.getAfter(x - 1, y - 1);
        value[14] = ret[0];
        value[15] = ret[1];
        return value;
    }
    maap(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    think() {
        let inputs = [];
        inputs[0] = this.food.x / w;
        inputs[1] = this.food.y / h;
        let head = this.body[this.body.length - 1];
        inputs[2] = head.x / w;
        inputs[3] = head.y / h;
        inputs[4] = this.getdist();

        let val = this.info();
        let index = 0;
        for (let i = 5; i < 5 + 16; i++) {
            inputs[i] = val[index];
            index++;
        }
        let output = this.brain.feedforward(inputs);
        //console.log(output);
        if (output[0] > 0.9) {
            if (this.yspeed != 1)
                this.setDir(0, -1);
        }
        if (output[1] > 0.9) {
            if (this.yspeed != -1)
                this.setDir(0, 1);
        }
        if (output[2] > 0.9) {
            if (this.xspeed != 1)
                this.setDir(-1, 0);

        }
        if (output[3] > 0.9) {
            if (this.xspeed != -1)
                this.setDir(1, 0);

        }

    }
    getdist() {
        let inputs = [];
        inputs[0] = this.food.x;
        inputs[1] = this.food.y;
        let head = this.body[this.body.length - 1];
        inputs[2] = head.x;
        inputs[3] = head.y;
        let a = inputs[0] - inputs[2];
        let b = inputs[1] - inputs[3];
        return dist = Math.sqrt(a * a + b * b);

    }
    createfood() {
        let x = floor(random(w));
        let y = floor(random(h));
        return createVector(x, y);

    }

}