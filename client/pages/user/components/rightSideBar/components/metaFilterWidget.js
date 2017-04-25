Template.metaFilterWidget.onCreated(function(){
  this.limit = new ReactiveVar(3);
  this.showLess = new ReactiveVar(false);
  this.paginationText = new ReactiveVar('Show More');
  this.selected = new ReactiveVar('all');
});

Template.metaFilterWidget.events({
	"click #meta_filter"(e, instance) {
    let filters = Session.get('filters') ? Session.get('filters') : {};
    filters[instance.data.metaFilter] = { $all: [e.target.text] };
    Session.set('filters', filters);
    instance.selected.set(e.target.text);
  },
  "click #meta_filter_all"(e, instance) {
    let filters = Session.get('filters') ? Session.get('filters') : {};
    delete filters[instance.data.metaFilter];
    Session.set('filters', filters);
    instance.selected.set('all');
  },
  "click #meta_load_more"(e, instance){
    if (instance.showLess) {
      instance.limit.set(Template.instance().data.metaItems.length);
      instance.paginationText.set('Show Less');
    } else {
      instance.limit.set(3);
      instance.paginationText.set('Show More');
    }
    instance.showLess = !instance.showLess;
  }
});

Template.metaFilterWidget.helpers({
  items() {
    return Template.instance().data.metaItems.slice(0, Template.instance().limit.get());
  },
  paginationText() {
    return Template.instance().paginationText.get();
  },
  isActive(item) {
    return item == Template.instance().selected.get() ? 'active' : '';
  }
});