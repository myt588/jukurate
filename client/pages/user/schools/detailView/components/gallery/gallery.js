Template.schoolGallery.onCreated(function() {
  this.autorun(() => {
    this.subscribe('files.images.byOwner', this.data.school._id);
  })
});

Template.schoolGallery.helpers({
  images() {
    return Files.find().each();
  }
});

Template.schoolGallery.onRendered(function() {
  // // Creating waving border
  if($.isFunction($.fn.dragScroll))
    $('.gallery').before('<div class="wave-top-gallery"></div>').dragScroll({});
  
  // Photo Viewer lightbox
  if($(".gallery").length||$("a[data-lightbox='gallery']").length) 
    $(".lightbox").css({marginLeft:0});

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


Template.schoolGallery.onDestroyed(function(){
  $('.wave-top-gallery').remove();
});