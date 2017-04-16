Template.courseForm.onCreated(function() {
	Meteor.subscribe('tutors.all');
});

Template.courseForm.helpers({
	_optionsTag() {
		return _.map(TAGS || [], function (item) {
      return {label: item, value: item};
    });
	},
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
	_selOptions() {
		return {
			hideSelected: true,
	    plugins: {
	      "remove_button": {}
	    }
	  }
	},
	_settings() {
		return {
	    toolbar: [
		    ['style', ['bold', 'italic', 'underline', 'clear']],
		    ['para', ['ul', 'ol', 'paragraph']],
		    ['misc', ['fullscreen', 'codeview', 'undo', 'redo']]
		  ]
	  }
	},
});