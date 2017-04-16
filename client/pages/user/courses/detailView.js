Template.courseDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('courses.id', this.getId());
  });
});

Template.courseDetailView.helpers({
	course() {
   	return Courses.findOne({_id: Router.current().params.id});
  }
});

