Template.regularTutorList.onCreated(function(){
  this.autorun(() => {
    this.subscribe('tutors.limit', 8, Session.get('schoolFilter'));
  });
});

Template.regularTutorList.helpers({
	items() {
		return Tutors.find();
	}
});