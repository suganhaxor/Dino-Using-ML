class Cactus {
    constructor() {
        let size = [
            40, 60
        ]
        this.r = size[Math.floor(Math.random() * size.length)];
        size = [
            100, 140
        ]
        this.absHeight = size[Math.floor(Math.random() * size.length)];
        this.x = width;
        this.low = 10;
        this.h = this.r + lineup;

        this.y = height - this.h;
        this.velocityX = -10;
    }

    offscreen() {
        if (this.x <= 0) {
            return true;
        } else {
            return false;
        }
    }
    show() {
        rect(this.x, this.y - this.absHeight / 2 + this.r / 2 - this.low, this.r, this.absHeight);
        this.x += this.velocityX;
    }
    display() {
        fill(100);
    }

}