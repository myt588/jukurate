Template.schoolDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('schools.id', this.getId());
  });
});

Template.schoolDetailView.events({
	"click #top"(e) {
		e.preventDefault();
    $('html, body').stop().animate({
	    scrollTop: 0
	  }, 600);
	  // $('[data-toggle="tooltip"]').tooltip('hide');
	},
	"click #gogal"(e) {
		e.preventDefault();
    $('html, body').stop().animate({
	    scrollTop: $("#gal").offset().top - 112
	  }, 600);
	  // $('[data-toggle="tooltip"]').tooltip('hide');
	},
	"click #godesc, click #gotutor, click #gocourse, click #gocoupon, click #gorev, click #gomp"(e) {
		e.preventDefault();
		const id = '#'+ e.target.id.substring(2);
    $('html, body').stop().animate({
      scrollTop: $(id).offset().top - 124
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
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
    
    
