class Dash{
	constructor(){
		this.x = width/2;
		this.r = 20;
		this.y = height - this.r;
		this.xspeed = 0;
	
	}
	show(){
		rect(this.x, this.y, this.r, this.r);
	}
	setDir(pos){
		console.log(this.xspeed, this.x);
		this.xspeed += pos;
	}
	move(){
	if(this.x > 0  && this.x < width - this.r){
		this.x += this.xspeed;
		console.log(this.x);
	}
	}
}