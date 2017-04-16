Template.schoolEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('schools.id', this.getId());
  });
});

Template.schoolEdit.helpers({
  school: function() {
   	return Schools.findOne({_id: Router.current().params.id});
  }
});