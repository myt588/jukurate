Template.schoolTutorList.onCreated(function(){
	this.subscribe('tutors.all');
});

Template.schoolTutorList.helpers({
	items() {
		return Tutors.find({});
	}
});