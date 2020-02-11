class Path {
    constructor() {
        this.x = 0;
        this.map = 0;
        this.y = 0;
        this.velocityX = -6.5;
    }
    show() {
        line(0, height - lineup, 900, height - lineup);
        //  line(this.x, this.y, this.x + 8, this.y);
    }
    getPosition() {
        this.x = width - 5;
        this.y = 435 + abs(Math.floor(Math.random() * 10 - 1));
    }
    offscreen() {
        if (this.x <= 0) {
            return true;
        } else {
            return false;
        }
    }
    move() {
        this.x += this.velocityX;
    }

}