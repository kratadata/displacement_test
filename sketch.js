let simpleShader;
let img0;
let img1;
let img;
let over = false;
let step = 0.1;
let amount = 0;
let overMouse;
let outMouse;
let timer = 1;

function preload(){
  // Load the shader
  simpleShader = loadShader('basic.vert', 'basic.frag');
  
  // Load the image
  img0 =loadImage("test.png");
  img1 = loadImage("noise.jpeg");

}

function setup() {
  // shaders require WEBGL mode to work
  cvs = createCanvas(windowWidth * 0.7, windowHeight * 0.7, WEBGL);

    // Create the texture from the image
  texture = createGraphics(img0.width, img0.height);
  texture.image(img0, 0, 0);

  overMouse = createVector(0,0);
  outMouse = createVector(0,0);

  //Now, we need to add an Event Listener to listen when the image gets mouse over.
  imgDiv = document.getElementById("test");
  cvs.parent(imgDiv)

  imgDiv.addEventListener('mouseover', function(){
    over = true;
  })
  imgDiv.addEventListener('mouseout', function(){
    over = false;
  })

}

function draw() {  

  if (over) {
    mx = map(mouseX, 0, width, -0.05, 0.05);
    my = map(mouseY, 0, width, -0.1, 0.1);
    overMouse = createVector(mx,my);
    amount = 0;
    timer+=random(0.001, 0.005);

  } else {
    outMouse = createVector(0,0);
    if (amount < 1){
      amount += step;
    } else {
      amount = 1;
    } 

    let v3 = p5.Vector.lerp(overMouse, outMouse, amount);
    mx = v3.x
    my = v3.y
    
    timer = lerp(timer, 0, amount);
  }


  shader(simpleShader);
  // Send the image to the shader
  simpleShader.setUniform("uTexture0", img0);
  simpleShader.setUniform("uTexture1", img1);
  simpleShader.setUniform('uResolution', [img0.width, img0.height]);
  simpleShader.setUniform("uTime", timer);
  simpleShader.setUniform("uScale", [mx, my]);
  // rect gives us some geometry on the screen
  noStroke();
  rect(0,0, width, height);


}

function windowResized() {
  resizeCanvas(windowWidth * 0.7, windowHeight * 0.7);
}


