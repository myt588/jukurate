Template.dashboard.onCreated(function() {
	this.autorun(() => {
    this.subscribe('schools.id', Meteor.user().schoolId());
  })
});

Template.dashboard.helpers({
	school() {
		return Schools.findOne({});
	}
});