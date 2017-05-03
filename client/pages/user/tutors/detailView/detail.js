Template.tutorDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('tutors.id', this.getId());
  });
});

Template.tutorDetailView.events({
  "click #top"(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
  },
  "click #godesc, click #gotutor, click #gocourse, click #gocoupon, click #gorev"(e) {
    e.preventDefault();
    const id = '#'+ e.target.id.substring(2);
    $('html, body').stop().animate({
      scrollTop: $(id).offset().top - 124
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
  }
});

Template.tutorDetailView.helpers({
	tutor() {
    let tutor = Tutors.findOne({});
   	return tutor;
  },
  filter(tutor) {
    return {tutor_id: {$in: [tutor._id]}};
  },
});

