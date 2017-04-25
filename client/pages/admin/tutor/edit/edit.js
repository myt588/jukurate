Template.tutorEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('tutors.id', this.getId());
  });
})

Template.tutorEdit.helpers({
  tutor: function() {
   	return Tutors.findOne({_id: Router.current().params.id});
  }
});