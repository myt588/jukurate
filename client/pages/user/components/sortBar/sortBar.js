const sortList = [
	{recommend_level : -1},
	{rating_count : -1},
	{rating : -1}
];

Template.sortBar.onCreated(function() {
	this.selected = new ReactiveVar(SORT_OPTIONS[0]);
	let sort = Session.get('sort_by');
	if (sort) {
		let index;
		for (var i = 0; i < sortList.length; i++) {
			if (_.isEqual(sort, sortList[i])) {
				index = i;
				break;
			}
		}
		this.selected.set(SORT_OPTIONS[index]);
	}
});

Template.sortBar.events({
	'click #sort_option'(e, instance) {
		let index = _.indexOf(SORT_OPTIONS, e.target.text)
		let sortBy = sortList[index];
		Session.set('sort_by', sortBy);
		instance.selected.set(e.target.text);
	}
});

Template.sortBar.helpers({
	options() {
		return SORT_OPTIONS;
	},
	selected() {
		return Template.instance().selected.get();
	}
});