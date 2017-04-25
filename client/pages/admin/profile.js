Template.adminProfile.onCreated(function(){
	this.autorun(() => {
    this.subscribe('schools.id', Meteor.user().schoolId());
  });
});

Template.adminProfile.helpers({
	school() {
		return Schools.findOne({});
	}
});