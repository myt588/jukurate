Template.schoolDetailView.onCreated(function(){
	this.subscribe('schools.id', Router.current().params.id);
});

Template.schoolDetailView.events({
	"click .quick-menu a.top"(e) {
		e.preventDefault();
    $('html, body').stop().animate({
	    scrollTop: 0
	  }, 600);
	  $('[data-toggle="tooltip"]').tooltip('hide');
	},
	"click .quick-menu a.gal"(e) {
		e.preventDefault();
    $('html, body').stop().animate({
	    scrollTop: $("#gal").offset().top - 112
	  }, 600);
	  $('[data-toggle="tooltip"]').tooltip('hide');
	},
	"click .quick-menu a.desc"(e) {
		e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $("#desc").offset().top - 124
    }, 600);
    $('[data-toggle="tooltip"]').tooltip('hide');
	},
	"click .quick-menu a.tutor"(e) {
		e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $("#tutor").offset().top - 124
    }, 600);
    $('[data-toggle="tooltip"]').tooltip('hide');
	},
	"click .quick-menu a.rev"(e) {
		e.preventDefault();
		$('html, body').stop().animate({
      scrollTop: $("#rev").offset().top - 124
    }, 600);
    $('[data-toggle="tooltip"]').tooltip('hide');
	}
}); 

Template.schoolDetailView.helpers({
	school() {
		let school = Schools.findOne({_id: Router.current().params.id});
		return school;
	},
	filter(school) {
    return {school_id: {$in: [school._id]}};
  },
});
    
    
