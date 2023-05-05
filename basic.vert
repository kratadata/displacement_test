attribute vec3 aPosition;
uniform vec2 uResolution;

// P5 provides us with texture coordinates for most shapes
attribute vec2 aTexCoord;

// This is a varying variable, which in shader terms means that it will be passed from the vertex shader to the fragment shader
varying vec2 vTexCoord;

void main() {
  // Copy the texcoord attributes into the varying variable
   
    // Calculate the scale factor based on canvas aspect ratio
     //float canvasAspect = uResolution.x / uResolution.y;
     //float textureAspect = uResolution.y / uResolution.x;
     //float scaleFactor = (canvasAspect > textureAspect) ? (3.0 / canvasAspect) : (3.0 / textureAspect);

  vTexCoord = aTexCoord;
  
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;


 
}