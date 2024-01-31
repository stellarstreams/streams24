// based on http://particleslider.com/

function scaleDataURL(dataURL){
  return new Promise(done=>{
    var img = new Image;
    img.onload = ()=>{
      var scale, newWidth, newHeight, canvas, ctx;
      scale = 0.8*window.innerWidth / img.width;
      newWidth = img.width * scale;
      newHeight = img.height * scale;
      canvas = document.createElement('canvas');
      canvas.height = newHeight;
      canvas.width = newWidth;
      ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight);
      done(canvas.toDataURL());
    };
    img.src = dataURL;
  });
}

var init = function(){

  var isMobile = navigator.userAgent &&
    navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
  var isSmall = window.innerWidth < 500;

  var ps = new ParticleSlider({
    ptlGap: isMobile || isSmall ? 1 : 1,
    ptlSize: isMobile || isSmall ? 2 : 2,
    width: 1e9,
    height: 1e9,
    mouseForce: 400 ,
    monochrome: true ,
    color: '#f8f8ff'
  });
}


var initParticleSlider = function(){

  var psScript = document.createElement('script');

  (psScript.addEventListener
    ? psScript.addEventListener('load', init, false)
    : psScript.onload = init);
  psScript.src = 'https://particleslider.com/js/particleslider/current/particleslider.js';
    psScript.setAttribute('type', 'text/javascript');
  document.body.appendChild(psScript);
}

function resize_image(){
scaleDataURL(document.getElementById('first-slide').dataset.src).then(scaledSrc=>{
  document.getElementById('first-slide').dataset.src = scaledSrc;
});
}
resize_image();

function reload(){
  resize_image(); initParticleSlider;
}
window.addEventListener('resize', reload);

(window.addEventListener
  ? window.addEventListener('load', initParticleSlider, false)
  : window.onload = initParticleSlider);

var menu =  document.querySelector('#menu');
var box =  document.querySelector('#main');
var toplabel =  document.querySelector('#toplabel');
var constraints =  document.querySelector('#constraints');
var boxPosition = box.getBoundingClientRect().top;
var btn = $(".button");
var btnw=  document.querySelector('#buttonwrap a');

window.addEventListener('scroll', function() {
    if (window.pageYOffset >= boxPosition*0.25) {
        menu.style.top = '0px';
        menu.style.backgroundColor='#222222';
        toplabel.style.top = '-200px';
        constraints.style.top = '-70%';
        btn.addClass('show');
        btnw.href="#";
    } else {
        menu.style.top = 'calc(100% - 100px)';
        menu.style.bottom = '';
        menu.style.backgroundColor='transparent';
        constraints.style.top = '0px';
        toplabel.style.top = '0px';
        btn.removeClass('show');
        btnw.href="#idea";
    }
});


// see https://nextparticle.nextco.de for more informations

var nextParticle = new NextParticle(document.streams24logo);
nextParticle.size = Math.max(window.innerWidth, window.innerHeight);
nextParticle.minWidth = nextParticle.size;
nextParticle.minHeight = nextParticle.size;
nextParticle.maxWidth = nextParticle.size;
nextParticle.maxHeight = nextParticle.size;

var redraw = function() {
  nextParticle.initPosition = "none";
  nextParticle.initDirection = "none";
  nextParticle.fadePostion = "none";
  nextParticle.fadeDirection = "none";
  nextParticle.minWidth = nextParticle.size;
  nextParticle.minHeight = nextParticle.size;
  nextParticle.maxWidth = nextParticle.size;
  nextParticle.maxHeight = nextParticle.size;
  nextParticle.color = nextParticle.colorize ? nextParticle.tint : '';
  nextParticle.start();
};

var gui = new dat.GUI();
gui.add(nextParticle, "particleGap", 1, 10, 1).onChange(redraw);
gui.add(nextParticle, "noise", 0, 200, 1).onChange(redraw);
gui.add(nextParticle, "mouseForce", -200, 200, 1).onChange(redraw);
gui.add(nextParticle, "size", 100, 800, 1).onChange(redraw);
gui.add(nextParticle, "colorize").onChange(redraw);
gui.addColor(nextParticle, "tint").onChange(redraw);

if (window.innerWidth < 1000) {
  gui.close();
}

window.onresize(function() {
  nextParticle.width = window.innerWidth;
  nextParticle.height = window.innerHeight;
  redraw();
});
