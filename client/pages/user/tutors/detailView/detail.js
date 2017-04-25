Template.tutorDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('tutors.id', this.getId());
  });
});

Template.tutorDetailView.helpers({
	tutor() {
    let tutor = Tutors.findOne({});
   	return tutor;
  },
  filter(tutor) {
    return {tutor_id: {$in: [tutor._id]}};
  },
});

