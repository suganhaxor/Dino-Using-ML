class Bird {
    constructor() {
        this.r = 40;
        this.absHeight = 40;
        let position = [
            height - 150,
            height - 130,
            height - 90 + 10
        ]
        this.x = width;
        this.h = this.r + lineup;
        this.y = position[Math.floor(Math.random() * position.length)];
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
        rect(this.x, this.y, this.r, this.r);

        this.x += this.velocityX;
    }
    display() {
        fill(100);
    }

}