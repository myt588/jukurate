Template.rightSideFilter.onCreated(function(){
	this.subscribe('schools.all');
});

Template.rightSideFilter.events({
	"click #school_filter"(e) {
		const school = Schools.findOne({'name': e.target.text});
    Session.set('schoolFilter', {'school_id': school._id});

  },
});

Template.rightSideFilter.helpers({
	schools() {
		return Schools.find({});
	}
});