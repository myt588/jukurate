Template.frontLayout.onRendered(function(){
	var he = ".hero-header ",
  temp,
  he_ = $(".hero-header"),
  color_skin = $("<div class='dumb'>").appendTo("body").addClass("color_skin").css("background-color");
  $(".dumb").remove();
  $(".navbar-inverse .container").prepend('<div class="navbar-header"></div>');
  $(".navbar-inverse .navbar-header").append('<a class="navbar-toggle"></a>');
  $(".navbar-inverse .navbar-header .navbar-toggle")
  .append('<span class="sr-only">Toggle</span>')
  .append('<span class="icon-bar"></span>')
  .append('<span class="icon-bar"></span>')
  .append('<span class="icon-bar"></span>');
  $(".search-popup,.review-popup,.pm-popup,.login-popup").prepend('<div class="back-site icon-arrow-left"></div>');
  setTooltips();
});

function setTooltips(){
  if(isMobile()){
    $('[data-toggle="tooltip"]').tooltip('disable');
  }
  else{
    $('[data-toggle="tooltip"]').tooltip('enable');
  }
}

function isMobile(){
  var isMobile = ('ontouchstart' in document.documentElement || navigator.userAgent.match(/Mobi/)?true:false);
  return isMobile;
}