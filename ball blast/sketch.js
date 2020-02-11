let dash;
function setup(){
	createCanvas(300, 600);
	dash = new Dash();
}
function draw(){
	background(100);
	dash.show();
	dash.move();
}
function keyPressed(){
	if(keyCode === LEFT_ARROW){
		dash.setDir(-3);
	}else if(keyCode === RIGHT_ARROW){
		dash.setDir(3);
	}
}