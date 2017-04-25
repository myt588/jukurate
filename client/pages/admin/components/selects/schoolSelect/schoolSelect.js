Template.schoolSelect.onCreated(function() {
	this.subscribe('schools.all');
});

Template.schoolSelect.helpers({
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
	_sOptions() {
		return {
			hideSelected: true,
	    plugins: {
	      "remove_button": {}
	    }
	  }
	},
});