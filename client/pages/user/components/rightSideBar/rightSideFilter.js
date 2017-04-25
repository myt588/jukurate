Template.rightSideFilter.onCreated(function(){
	Session.set('filters', {});
});

Template.rightSideFilter.events({

});

Template.rightSideFilter.helpers({
	subjects() {
		return SUBJECTS;
	}
});