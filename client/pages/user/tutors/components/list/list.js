Template.regularTutorList.onCreated(function(){
  this.autorun(() => {
    this.subscribe('tutors.limit', Session.get('load_more_tutors'), Session.get('filters'));
  });
});

Template.regularTutorList.helpers({
	items() {
		return Tutors.find();
	}
});