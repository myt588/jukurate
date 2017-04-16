Template.tutorForm.onCreated(function() {
	Meteor.subscribe('schools.all');
	Meteor.subscribe('files.images.all');
});

Template.tutorForm.helpers({
	_optionsTag() {
		return _.map(TAGS || [], function (item) {
      return {label: item, value: item};
    });
	},
	_optionsSchool() {
		const schools = Schools.find({}).fetch();
		if (schools.length == 0) {
			return null;
		} else {
			return _.map(schools, function (item) {
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