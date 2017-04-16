Template.regularCourseList.onCreated(function(){
	this.subscribe('courses.all');
});

Template.regularCourseList.helpers({
	items() {
		return Courses.find({});
	}
});