Template.schoolAssign.onCreated(function() {
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
		this.subscribe('users.schoolAdmin', this.getId());
  });
});

Template.schoolAssign.events({
	"submit .assignForm" (e, instance) {
		e.preventDefault();
		var email = document.getElementById("email");
		Meteor.call('assignAdmin', email.value, Router.current().params.id, (error, result) => {
			if (error) {

			} else {

			}
		});
	},
	"click #remove_user" (e, instance) {
		e.preventDefault();
		if (e.target.className == 'fa fa-times') {
			let user = Meteor.users.findOne({'emails.0.address': e.target.id});
			Meteor.call('removeAdmin', user._id, Router.current().params.id, (error, result) => {
				if (error) {

				} else {

				}
			});
		}
	}
});

Template.schoolAssign.helpers({
	users() {
		return Meteor.users.find({}).fetch();
	}
});