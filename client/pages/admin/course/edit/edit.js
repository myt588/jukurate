Template.courseEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('courses.id', this.getId());
  });
})

Template.courseEdit.helpers({
  course: function() {
   	return Courses.findOne({_id: Router.current().params.id});
  }
});