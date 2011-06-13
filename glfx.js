/*
 * glfx.js
 * http://evanw.github.com/glfx.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var fx=function(){function r(b,c,g){return Math.max(b,Math.min(c,g))}function x(b){return{_:b,destroy:function(){this._.destroy()}}}function B(b){return x(u.fromImage(b))}function C(b,c){var g=a.getExtension("OES_texture_float")?a.FLOAT:a.UNSIGNED_BYTE;this._.texture&&this._.texture.destroy();this._.spareTexture&&this._.spareTexture.destroy();this.width=b;this.height=c;this._.texture=new u(b,c,a.RGBA,g);this._.spareTexture=new u(b,c,a.RGBA,g);this._.flippedShader=this._.flippedShader||new m(null,
"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");this._.isInitialized=true}function D(b){if(!this._.isInitialized||b._.width!=this.width||b._.height!=this.height)C.call(this,b._.width,b._.height);b._.use();this._.texture.drawTo(function(){m.getDefaultShader().drawRect()});return this}function E(){this._.texture.use();this._.flippedShader.uniforms({texSize:[this._.texture.width,
this._.texture.height]}).drawRect();return this}function n(b,c){this._.texture.use();this._.spareTexture.drawTo(function(){b.uniforms(c).drawRect()});this._.spareTexture.swapWith(this._.texture)}function F(b){b.parentNode.insertBefore(this,b);b.parentNode.removeChild(b);return this}function G(){var b=new u(this._.texture.width,this._.texture.height,a.RGBA,a.UNSIGNED_BYTE);this._.texture.use();b.drawTo(function(){m.getDefaultShader().drawRect()});return x(b)}function H(b){var c=this._.texture.width,
g=this._.texture.height,e=new Uint8Array(c*g*4);this._.texture.drawTo(function(){a.readPixels(0,0,c,g,a.RGBA,a.UNSIGNED_BYTE,e)});var d=document.createElement("canvas"),h=d.getContext("2d");d.width=c;d.height=g;for(var i=h.createImageData(c,g),f=0;f<e.length;f++)i.data[f]=e[f];h.putImageData(i,0,0);return d.toDataURL(b)}function k(b){return function(){a=this._.gl;return b.apply(this,arguments)}}function y(b,c,g,e,d,h,i,f){var j=g-d,l=e-h,o=i-d,p=f-h;d=b-g+d-i;h=c-e+h-f;var q=j*p-o*l;o=(d*p-o*h)/q;
j=(j*h-d*l)/q;return[g-b+o*g,e-c+o*e,o,i-b+j*i,f-c+j*f,j,b,c,1]}function z(b){var c=b[0],g=b[1],e=b[2],d=b[3],h=b[4],i=b[5],f=b[6],j=b[7];b=b[8];var l=c*h*b-c*i*j-g*d*b+g*i*f+e*d*j-e*h*f;return[(h*b-i*j)/l,(e*j-g*b)/l,(g*i-e*h)/l,(i*f-d*b)/l,(c*b-e*f)/l,(e*d-c*i)/l,(d*j-h*f)/l,(g*f-c*j)/l,(c*h-g*d)/l]}function I(b,c){return[b[0]*c[0]+b[1]*c[3]+b[2]*c[6],b[0]*c[1]+b[1]*c[4]+b[2]*c[7],b[0]*c[2]+b[1]*c[5]+b[2]*c[8],b[3]*c[0]+b[4]*c[3]+b[5]*c[6],b[3]*c[1]+b[4]*c[4]+b[5]*c[7],b[3]*c[2]+b[4]*c[5]+b[5]*
c[8],b[6]*c[0]+b[7]*c[3]+b[8]*c[6],b[6]*c[1]+b[7]*c[4]+b[8]*c[7],b[6]*c[2]+b[7]*c[5]+b[8]*c[8]]}function w(b,c){return new m(null,b+"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;"+c+"gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}")}
function J(b,c){a.brightnessContrast=a.brightnessContrast||new m(null,"uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
n.call(this,a.brightnessContrast,{brightness:r(-1,b,1),contrast:r(-1,c,1)});return this}function K(b,c){a.hueSaturation=a.hueSaturation||new m(null,"uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.0-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}");
n.call(this,a.hueSaturation,{hue:r(-1,b,1),saturation:r(-1,c,1)});return this}function L(b,c){b=Math.max(0,Math.min(20,Math.floor(b)));if(b==0||isNaN(b))return this;a.lensBlurPrePass=a.lensBlurPrePass||new m(null,"uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}");name="lensBlur"+b;a[name]=
a[name]||new m(null,"uniform sampler2D texture;uniform float power;uniform float radius;uniform vec2 texSize;varying vec2 texCoord;vec4 sample(float x,float y){return texture2D(texture,texCoord+vec2(x,y)/texSize);}void main(){vec4 color=vec4(0.0);"+function(){function e(s,v){return s*s+v*v<=(b+0.25)*(b+0.25)}function d(s,v,M){h+="color+=sample("+v.toFixed(1)+","+M.toFixed(1)+
")"+(s==1?"":"*"+s.toFixed(1))+";";i+=s}for(var h="",i=0,f=-b;f<=b;f+=2)for(var j=-b;j<=b;j+=2){var l=e(f,j),o=e(f,j+1),p=e(f+1,j),q=e(f+1,j+1);if(l&&o&&p&&q)d(4,f+0.5,j+0.5);else if(l&&o&&!p&&!q)d(2,f,j+0.5);else if(l&&p&&!o&&!q)d(2,f+0.5,j);else if(p&&q&&!l&&!o)d(2,f+1,j+0.5);else if(o&&q&&!l&&!p)d(2,f+0.5,j+1);else{l&&d(1,f,j);o&&d(1,f,j+1);p&&d(1,f+1,j);q&&d(1,f+1,j+1)}}h+="color/="+i.toFixed(1)+";";return h}()+"color=pow(color,vec4(power));gl_FragColor=color;}");
var g=Math.pow(10,r(-1,c,1));n.call(this,a.lensBlurPrePass,{power:g});n.call(this,a[name],{power:1/g,texSize:[this.width,this.height]});return this}function N(b,c,g,e,d,h){a.tiltShift=a.tiltShift||new m(null,"uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;"+t+"void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);color+=texture2D(texture,texCoord+delta/texSize*percent*radius)*weight;total+=weight;}gl_FragColor=color/total;}");
var i=g-b,f=e-c,j=Math.sqrt(i*i+f*f);n.call(this,a.tiltShift,{blurRadius:d,gradientRadius:h,start:[b,c],end:[g,e],delta:[i/j,f/j],texSize:[this.width,this.height]});n.call(this,a.tiltShift,{blurRadius:d,gradientRadius:h,start:[b,c],end:[g,e],delta:[-f/j,i/j],texSize:[this.width,this.height]});return this}function O(b){a.triangleBlur=a.triangleBlur||new m(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+t+"void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);color+=texture2D(texture,texCoord+delta*percent)*weight;total+=weight;}gl_FragColor=color/total;}");
n.call(this,a.triangleBlur,{delta:[b/this.width,0]});n.call(this,a.triangleBlur,{delta:[0,b/this.height]});return this}function P(b,c,g){a.zoomBlur=a.zoomBlur||new m(null,"uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;"+t+"void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);color+=texture2D(texture,texCoord+toCenter*percent*strength/texSize)*weight;total+=weight;}gl_FragColor=color/total;}");
n.call(this,a.zoomBlur,{center:[b,c],strength:g,texSize:[this.width,this.height]});return this}function Q(b,c,g,e){a.colorHalftone=a.colorHalftone||new m(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}");
n.call(this,a.colorHalftone,{center:[b,c],angle:g,scale:Math.PI/e,texSize:[this.width,this.height]});return this}function R(b,c,g,e){a.dotScreen=a.dotScreen||new m(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}");
n.call(this,a.dotScreen,{center:[b,c],angle:g,scale:Math.PI/e,texSize:[this.width,this.height]});return this}function S(b){a.edgeWork1=a.edgeWork1||new m(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+t+"void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}");
a.edgeWork2=a.edgeWork2||new m(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+t+"void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}");
n.call(this,a.edgeWork1,{delta:[b/this.width,0]});n.call(this,a.edgeWork2,{delta:[0,b/this.height]});return this}function T(b,c,g){a.hexagonalPixelate=a.hexagonalPixelate||new m(null,"uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}");
n.call(this,a.hexagonalPixelate,{center:[b,c],scale:g,texSize:[this.width,this.height]});return this}function U(b){a.ink=a.ink||new m(null,"uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}");
n.call(this,a.ink,{strength:b*b*b*b*b,texSize:[this.width,this.height]});return this}function V(b,c,g,e){a.bulgePinch=a.bulgePinch||w("uniform float radius;uniform float strength;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
n.call(this,a.bulgePinch,{radius:g,strength:r(-1,e,1),center:[b,c],texSize:[this.width,this.height]});return this}function W(b,c){a.matrixWarp=a.matrixWarp||w("uniform mat3 matrix;","vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;");b=Array.prototype.concat.apply([],b);if(b.length==4)b=[b[0],b[1],0,b[2],b[3],0,0,0,1];else if(b.length!=9)throw"can only warp with 2x2 or 3x3 matrix";n.call(this,a.matrixWarp,{matrix:c?z(b):b,texSize:[this.width,this.height]});
return this}function X(b,c){var g=y.apply(null,c),e=y.apply(null,b);return this.matrixWarp(I(z(g),e))}function Y(b,c,g,e){a.swirl=a.swirl||w("uniform float radius;uniform float angle;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
n.call(this,a.swirl,{radius:g,center:[b,c],angle:e,texSize:[this.width,this.height]});return this}var A={},a;A.canvas=function(){var b=document.createElement("canvas");try{a=b.getContext("experimental-webgl",{premultipliedAlpha:false})}catch(c){a=null}if(!a)throw"This browser does not support WebGL";b._={gl:a,isInitialized:false,texture:null,spareTexture:null,flippedShader:null};b.texture=k(B);b.draw=k(D);b.update=k(E);b.replace=k(F);b.contents=k(G);b.toDataURL=k(H);b.brightnessContrast=k(J);b.hexagonalPixelate=
k(T);b.hueSaturation=k(K);b.colorHalftone=k(Q);b.triangleBlur=k(O);b.perspective=k(X);b.matrixWarp=k(W);b.bulgePinch=k(V);b.tiltShift=k(N);b.dotScreen=k(R);b.edgeWork=k(S);b.lensBlur=k(L);b.zoomBlur=k(P);b.swirl=k(Y);b.ink=k(U);return b};var m=function(){function b(d,h){var i=a.createShader(d);a.shaderSource(i,h);a.compileShader(i);if(!a.getShaderParameter(i,a.COMPILE_STATUS))throw"compile error: "+a.getShaderInfoLog(i);return i}function c(d,h){this.texCoordAttribute=this.vertexAttribute=null;this.program=
a.createProgram();d=d||g;h=h||e;h="precision highp float;"+h;a.attachShader(this.program,b(a.VERTEX_SHADER,d));a.attachShader(this.program,b(a.FRAGMENT_SHADER,h));a.linkProgram(this.program);if(!a.getProgramParameter(this.program,a.LINK_STATUS))throw"link error: "+a.getProgramInfoLog(this.program);}var g="attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",e="uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";
c.prototype.destroy=function(){a.deleteProgram(this.program);this.program=null};c.prototype.uniforms=function(d){a.useProgram(this.program);for(var h in d)if(d.hasOwnProperty(h)){var i=a.getUniformLocation(this.program,h);if(i!==null){var f=d[h];if(Object.prototype.toString.call(f)=="[object Array]")switch(f.length){case 1:a.uniform1fv(i,new Float32Array(f));break;case 2:a.uniform2fv(i,new Float32Array(f));break;case 3:a.uniform3fv(i,new Float32Array(f));break;case 4:a.uniform4fv(i,new Float32Array(f));
break;case 9:a.uniformMatrix3fv(i,false,new Float32Array(f));break;case 16:a.uniformMatrix4fv(i,false,new Float32Array(f));break;default:throw"dont't know how to load uniform \""+h+'" of length '+f.length;}else if(Object.prototype.toString.call(f)=="[object Number]")a.uniform1f(i,f);else throw'attempted to set uniform "'+h+'" to invalid value '+(f||"undefined").toString();}}return this};c.prototype.textures=function(d){a.useProgram(this.program);for(var h in d)d.hasOwnProperty(h)&&a.uniform1i(a.getUniformLocation(this.program,
h),d[h]);return this};c.prototype.drawRect=function(d,h,i,f){var j=a.getParameter(a.VIEWPORT);h=h!==void 0?(h-j[1])/j[3]:0;d=d!==void 0?(d-j[0])/j[2]:0;i=i!==void 0?(i-j[0])/j[2]:1;f=f!==void 0?(f-j[1])/j[3]:1;if(a.vertexBuffer==null)a.vertexBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.bufferData(a.ARRAY_BUFFER,new Float32Array([d,h,d,f,i,h,i,f]),a.STATIC_DRAW);if(a.texCoordBuffer==null){a.texCoordBuffer=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,a.texCoordBuffer);a.bufferData(a.ARRAY_BUFFER,
new Float32Array([0,0,0,1,1,0,1,1]),a.STATIC_DRAW)}if(this.vertexAttribute==null){this.vertexAttribute=a.getAttribLocation(this.program,"vertex");a.enableVertexAttribArray(this.vertexAttribute)}if(this.texCoordAttribute==null){this.texCoordAttribute=a.getAttribLocation(this.program,"_texCoord");a.enableVertexAttribArray(this.texCoordAttribute)}a.useProgram(this.program);a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.vertexAttribPointer(this.vertexAttribute,2,a.FLOAT,false,0,0);a.bindBuffer(a.ARRAY_BUFFER,
a.texCoordBuffer);a.vertexAttribPointer(this.texCoordAttribute,2,a.FLOAT,false,0,0);a.drawArrays(a.TRIANGLE_STRIP,0,4)};c.getDefaultShader=function(){a.defaultShader=a.defaultShader||new c;return a.defaultShader};return c}(),u=function(){function b(e,d,h,i){this.id=a.createTexture();this.width=e;this.height=d;this.format=h;this.type=i;if(e&&d){a.bindTexture(a.TEXTURE_2D,this.id);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);
a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);a.texImage2D(a.TEXTURE_2D,0,this.format,e,d,0,this.format,this.type,null)}}function c(e){if(g==null)g=document.createElement("canvas");g.width=e.width;g.height=e.height;e=g.getContext("2d");e.clearRect(0,0,g.width,g.height);return e}b.fromImage=function(e){var d=new b(e.width,e.height,a.RGBA,a.UNSIGNED_BYTE);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,e);return d};
b.prototype.destroy=function(){a.deleteTexture(this.id);this.id=null};b.prototype.use=function(e){a.activeTexture(a.TEXTURE0+(e||0));a.bindTexture(a.TEXTURE_2D,this.id)};b.prototype.drawTo=function(e){a.framebuffer=a.framebuffer||a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,a.framebuffer);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.id,0);a.viewport(0,0,this.width,this.height);e();a.bindFramebuffer(a.FRAMEBUFFER,null)};var g=null;b.prototype.fillUsingCanvas=
function(e){e(c(this));this.format=a.RGBA;this.type=a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,g);return this};b.prototype.toImage=function(e){this.use();m.getDefaultShader().drawRect();var d=this.width*this.height*4,h=new Uint8Array(d),i=c(this),f=i.createImageData(this.width,this.height);a.readPixels(0,0,this.width,this.height,a.RGBA,a.UNSIGNED_BYTE,h);for(var j=0;j<d;j++)f.data[j]=h[j];i.putImageData(f,0,0);e.src=g.toDataURL()};
b.prototype.swapWith=function(e){var d;d=e.id;e.id=this.id;this.id=d;d=e.width;e.width=this.width;this.width=d;d=e.height;e.height=this.height;this.height=d;d=e.format;e.format=this.format;this.format=d};return b}(),t="float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}";return A}();