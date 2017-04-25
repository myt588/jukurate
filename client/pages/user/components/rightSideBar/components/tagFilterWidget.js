Template.tagFilterWidget.onCreated(function(){
	this.limit = new ReactiveVar(3);
  this.showLess = new ReactiveVar(false);
  this.paginationText = new ReactiveVar('Show More');
  this.selected = new ReactiveVar([]);
	this.subscribe('tags.schools');
});

Template.tagFilterWidget.events({
	"click #tag_filter.deselected"(e, instance) {
    let filters = Session.get('filters');
    let selected = instance.selected.get();
    selected.push(e.target.text);
    instance.selected.set(selected);
    filters.tags = { $all: selected };
    Session.set('filters', filters);
  },
  "click #tag_filter.selected"(e, instance) {
    let filters = Session.get('filters');
    let selected = instance.selected.get();
		selected = _.without(selected, e.target.text);
    instance.selected.set(selected);
    if (_.isEmpty(selected) ) {
			delete filters.tags;
    } else {
    	filters.tags = { $all: selected };
    }
    Session.set('filters', filters);
  },
});

Template.tagFilterWidget.helpers({
	tags() {
		return Tags.find().fetch();
	},
	selected(name) {
		const filters = Session.get('filters');
		const tags = filters.tags ? _.flatten(filters.tags) : {};
		return _.contains(tags, name) ? 'selected' : 'deselected';
	}
});
