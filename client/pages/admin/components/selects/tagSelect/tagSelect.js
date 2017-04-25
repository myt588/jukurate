Template.tagSelect.onCreated(function() {
	this.subscribe('tags.all');
});

Template.tagSelect.helpers({
	_optionsTag() {
		const tags = Tags.find({}).fetch();
		if (tags.length == 0) {
			return null;
		} else {
			return _.map(tags, function (item) {
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
