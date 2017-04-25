Template.courseSelect.onCreated(function() {
	 this.autorun(()=>{
    if (Meteor.user().isSchoolAdmin()) {
      this.subscribe('courses.bySchool', Meteor.user().schoolId());
    } else if (Meteor.user().isWebAdmin()) {
      this.subscribe('courses.all');
    }
  });
});

Template.courseSelect.helpers({
	_optionsCourse() {
		const courses = Courses.find({}).fetch();
		if (courses.length == 0) {
			return null;
		} else {
			return _.map(courses, function (item) {
	      return {label: item.title, value: item._id};
	    });
		}
	},
	_sOptions() {
		return {
			hideSelected: true,
	    plugins: {
	      "remove_button": {}
	    }
	  }
	},
});

