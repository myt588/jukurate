Template.schoolGallery.onRendered(function() {
  // Creating waving border
  if($.isFunction($.fn.dragScroll))
    $('.gallery').before('<div class="wave-top-gallery"></div>').dragScroll({});
  
  // Photo Viewer lightbox
  if($(".gallery").length||$("a[data-lightbox='gallery']").length) 
    $(".lightbox").css({marginLeft:0});

  // Listing all the items
  $(".gallery .gallery-item a").each(function(){
      var _ = $(this);
      var title = _.attr("data-title");
      if(title !== undefined && title !== "undefined" && title !== "" && title !== " "){
        _.after('<div class="gallery-item-caption">' + title + '</div>');
      }
      if(!_.parent().find("img").length){
        _.after('<img alt="" src="' + _.attr("href") + '" \/>');
      }
      else if(_.attr("href")===""||_.attr("href")===" "||_.attr("href")==="#"){
        _.attr("href",_.parent().find("img").attr("src"));
      }
    });

  /* Mousewheel scroll to listing gallery */
  if($.isFunction($.fn.mousewheel))
    $(".gallery").mousewheel(function(event, delta) {
      this.scrollLeft -= (delta * 30);
      event.preventDefault();
    });

  // Plus Sign Appearence Change
  $(".gallery-item a").on("mouseenter",function(){
    $(this).parent().addClass("dark-overlay");
    $(this).parent().find(".gallery-item-caption").stop().animate({opacity:0},{duration:1000});
  });

  $(".gallery-item a").on("mouseleave",function(){
    $(".gallery-item a").parent().removeClass("dark-overlay");
    $(this).parent().find(".gallery-item-caption").stop().animate({opacity:1},{duration:1000});
  });
});