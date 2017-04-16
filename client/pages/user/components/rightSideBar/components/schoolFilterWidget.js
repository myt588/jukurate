Template.schoolFilterWidget.onCreated(function(){
	this.limit = new ReactiveVar(3);
  this.paginationText = new ReactiveVar('Show More');
  this.selected = new ReactiveVar('all');
  this.autorun(() => {
    this.subscribe('schools.limit', this.limit.get(), {});
  });
});

Template.schoolFilterWidget.events({
	"click #school_filter"(e, instance) {
		const school = Schools.findOne({'name': e.target.text});
    let filters = Session.get('filters') ? Session.get('filters') : {};
    filters.school_id = school._id;
    Session.set('filters', filters);
    instance.selected.set(e.target.text);
  },
  "click #school_all"(e, instance) {
    let filters = Session.get('filters') ? Session.get('filters') : {};
    delete filters.school_id;
    Session.set('filters', filters);
    instance.selected.set('all');
  },
  "click #load_more"(e, instance){
    if (instance.showLess) {
      instance.limit.set(20);
      instance.paginationText.set('Show Less');
    } else {
      instance.limit.set(3);
      instance.paginationText.set('Show More');
    }
    instance.showLess = !instance.showLess;
  }
});

Template.schoolFilterWidget.helpers({
	schools() {
		return Schools.find({});
	},
  paginationText() {
    return Template.instance().paginationText.get();
  },
  isActive(item) {
    return item == Template.instance().selected.get() ? 'active' : '';
  }
});