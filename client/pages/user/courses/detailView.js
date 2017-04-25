Template.courseDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('courses.id', this.getId());
  });
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

