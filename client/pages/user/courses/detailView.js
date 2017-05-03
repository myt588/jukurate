Template.courseDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('courses.id', this.getId());
  });
});

Template.courseDetailView.events({
  "click #top"(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
  },
  "click #godesc, click #gotutor, click #goprice, click #gocoupon, click #gorev, click #gomp"(e) {
    e.preventDefault();
    const id = '#'+ e.target.id.substring(2);
    $('html, body').stop().animate({
      scrollTop: $(id).offset().top - 124
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
  }
}); 

Template.courseDetailView.helpers({
	course() {
		let course = Courses.findOne({});
   	return course;
  },
  tutorFilter(course) {
    return {_id: {$in: course.tutor_id}};
  },
  courseFilter(course) {
    return {course_ids: {$in: [course._id]}};
  }
});

