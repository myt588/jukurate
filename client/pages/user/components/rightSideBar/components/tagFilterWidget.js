Template.tagFilterWidget.onCreated(function(){
	this.limit = new ReactiveVar(3);
  this.showLess = new ReactiveVar(false);
  this.paginationText = new ReactiveVar('Show More');
  this.selected = new ReactiveVar([]);
  this.collectionName = () => {
    return this.data.collection;
  }
  this.autorun(()=>{
    const filters = {
      type: this.collectionName()
    };
    this.subscribe('tags.limit', 12, filters);
  });
});

Template.tagFilterWidget.events({
	"click #tag_filter.deselected"(e, instance) {
    let filters = Session.get('filters');
    let selected = instance.selected.get();
    selected.push(this._id);
    instance.selected.set(selected);
    filters.tags = { $all: selected };
    Session.set('filters', filters);
  },
  "click #tag_filter.selected"(e, instance) {
    let filters = Session.get('filters');
    let selected = instance.selected.get();
		selected = _.without(selected, this._id);
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
	selected(id) {
		const filters = Session.get('filters');
    if (filters) {
      const tags = filters.tags ? _.flatten(filters.tags) : {};
      return _.contains(tags, id) ? 'selected' : 'deselected';
    }
	}
});
