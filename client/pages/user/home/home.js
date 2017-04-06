Template.home.onRendered(function(){
	var he = ".hero-header ",
  temp,
  he_ = $(".hero-header");
  he_.prepend('<div class="hero-image"></div>');
  he_.prepend('<div class="overlay"></div>');
  he_.prepend('<div class="dot-overlay"></div>');
  if($(".masked").length)
  	$(".masked").prepend('<div class="hero-mask"></div>');
  if($(".texture").length)
  	$(".texture").prepend('<div class="hero-texture"></div>');
  $(he).not(".search-popup").find(".overlay").css({display:"block"});
	setCanvasEffect();
});

var image,
  appending,
  imageCanvas,
  imageCanvasContext,
  lineCanvas,
  lineCanvasContext,
  pointLifetime,
  points = [];

  function start() {
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resizeCanvases);
    appending.appendChild(imageCanvas);
    resizeCanvases();
    tick();
  }

  function onMouseMove(event) {
    var scroll = 0;
    if(!$(".search-popup").length)
    scroll = $(document).scrollTop();
    points.push({
      time: Date.now(),
      x: event.clientX,
      y: event.clientY + scroll
    });
  }

  function resizeCanvases() {
    setTimeout(function(){
      var c = setInterval(function(){
        if($(".hero-header canvas").length){
          imageCanvas.width = lineCanvas.width = $(".hero-header canvas").parent().width();
          imageCanvas.height = lineCanvas.height = $(".hero-header canvas").parent().height();
        }
      },1);
      setTimeout(function(){
        clearInterval(c);
      },200);
    },2000);
  }

  function tick() {
    points = points.filter(function(point) {
      var age = Date.now() - point.time;
      return age < pointLifetime;
    });
    drawLineCanvas();
    drawImageCanvas();
    requestAnimationFrame(tick);
  }

  function drawLineCanvas() {
    var minimumLineWidth = 40;
    var maximumLineWidth = 100;
    var lineWidthRange = maximumLineWidth - minimumLineWidth;
    var maximumSpeed = 50;
    lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    lineCanvasContext.lineCap = 'round';
    lineCanvasContext.shadowBlur = 20;
    lineCanvasContext.shadowColor = '#000';
    for (var i = 1; i < points.length; i++) {
      var point = points[i];
      var previousPoint = points[i - 1];
      var distance = getDistanceBetween(point, previousPoint);
      var speed = Math.max(0, Math.min(maximumSpeed, distance));
      var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
      lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;
      var age = Date.now() - point.time;
      var opacity = (pointLifetime - age) / pointLifetime;
      lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
      lineCanvasContext.beginPath();
      lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
      lineCanvasContext.lineTo(point.x, point.y);
      lineCanvasContext.stroke();
    }
  }

  function getDistanceBetween(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  function drawImageCanvas() {
    var top = 0, left = 0;
    var width = imageCanvas.width;
    var height = imageCanvas.width / image.naturalWidth * image.naturalHeight;
    if (height < imageCanvas.height) {
      width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
      height = imageCanvas.height;
      left = -(width-imageCanvas.width)/2;
    }
    else{
      top = -(height-imageCanvas.height)/2;
    }

    imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCanvasContext.globalCompositeOperation = 'source-over';
    imageCanvasContext.drawImage(image, left, top, width, height);
    imageCanvasContext.globalCompositeOperation = 'destination-in';
    imageCanvasContext.drawImage(lineCanvas, 0, 0);

  }

  function addCanvasEffect(){
    image = document.querySelector('.clear-image');
    appending = document.querySelector('.bg-container');
    imageCanvas = document.createElement('canvas');
    imageCanvasContext = imageCanvas.getContext('2d');
    lineCanvas = document.createElement('canvas');
    lineCanvasContext = lineCanvas.getContext('2d');
    pointLifetime = 1000;
    points = [];
    if (image.complete) {
      start();
    }
    else {
      image.onload = start;
    }
  }

  function setCanvasEffect(){
    var href = window.location.href;
    var dir = href.substring(0, href.lastIndexOf('/')) + "/";
    var bgImage;
    var cElement;
    if($(".h-video").length)
      cElement = $(".h-video");
    else if($(".h-slideshow").length)
      cElement = $(".h-slideshow");
    else if($(".hero-header").not(".login-popup,.review-popup,.pm-popup").length)
      cElement = $(".hero-header").not(".login-popup,.review-popup,.pm-popup");
    if(cElement==null) return;
    bgImage = cElement.find(".hero-image").css("background-image");
    if(bgImage!=="none"){
      bgImage = bgImage.replace(dir,"");
      bgImage = bgImage.replace(' ',"").replace(' ',"").replace(' ',"").replace(' ',"").replace(' ',"");
      bgImage = bgImage.replace('url(\"',"").replace("url(\'","").replace("url(","").replace('")',"");
      bgImage = bgImage.replace("')","").replace(")","");
      cElement
      .append('<div class="bg-container bg-media"><img class="clear-image" src="' + bgImage + '"></div>');
      addCanvasEffect();
    }
  }

  function showColors(){
    var colorsContainer = $(".template-colors");
    var colors = $(".template-colors a").length,
      colorCounter = 0;
    colorsContainer.animate({height:colorsContainer[0].scrollHeight},{duration: 2000,complete:function(){
      colorsContainer.css({overflow:"visible",height:"auto"});
      $(".change-color-button").css({right:"-60000px"});
    }});
    var initLandingColors = setInterval(function(){
      var c = $(".template-colors a").eq(colorCounter);
      c.css({visibility:"visible"}).animate({opacity:1},{duration:2000});
      if(c.css("background-color")===color_skin)
      c.addClass("current-color");
      colorCounter++;
      if(colorCounter===colors)
      clearInterval(initLandingColors);
    },80);
    resizeCanvases();
    videoRescale();
  }

  function checkElementsVisibility(){
    $('[data-background]').each(function(){
      if($(this).visible( true ))
      $(this).css({"background-image":"url(" + $(this).attr("data-background") + ")"}).removeAttr("data-background");
    });

    $('img[data-src]').each(function(){
      if($(this).visible( true )){
        $(this).attr("src",$(this).attr("data-src")).removeAttr("data-src").removeClass("img-placeholder");
      }
    });
  }