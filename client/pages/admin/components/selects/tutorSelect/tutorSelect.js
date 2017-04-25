Template.tutorSelect.onCreated(function() {
	 this.autorun(()=>{
    if (Meteor.user().isSchoolAdmin()) {
      this.subscribe('tutors.bySchool', Meteor.user().schoolId());
    } else if (Meteor.user().isWebAdmin()) {
      this.subscribe('tutors.all');
    }
  });
});

Template.tutorSelect.helpers({
	_optionsTutor() {
		const tutors = Tutors.find({}).fetch();
		if (tutors.length == 0) {
			return null;
		} else {
			return _.map(tutors, function (item) {
	      return {label: item.name, value: item._id};
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