let simpleShader;
let newX = 0;
let newY = 0;
let oldX = 0;
let oldY = 0;
let img;
let flip = 0;
let pg;

function preload(){
  // Load the shader
  simpleShader = loadShader('basic.vert', 'basic.frag');

  // Load the image
  // img = loadImage('');	
  img = loadImage("330px-Farallon_Islands_at_inferior_mirage_no_mirage_and_superior_mirage.jpg");
  
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(1080, 895, WEBGL);
	pg = createGraphics(width, height);
	if (flip == 1){
	  pg.scale(1, -1);
	  pg.image(img, 0, -height, width, height);
  }else{
    pg.image(img, 0, 0, width, height);
	}
  mouseX = width / 4;
	mouseY = height / 4;
}

function draw() {  
  if (frameCount%100 == 0){
    newX = random(width);
		newY = random(height);
	}
	if (newX > oldX) mouseX-=1;
	if (newX < oldX) mouseX+=1;
	if (newY > oldY) oldY-=1;
	if (newY < oldY) mouseY+=1;
	
  // shader() sets the active shader with our shader
  shader(simpleShader);
  
  const mx = map(mouseX, 0, width, 0, 100);
  const my = map(mouseY, 0, height, 0, 100);
  
  // Send the image to the shader
  simpleShader.setUniform("uTexture", pg);
  simpleShader.setUniform("uScale", [mx, my]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}

function keyPressed(){
    save('pix.jpg');
}
 