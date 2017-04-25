Template.schoolEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('schools.id', this.getId());
    if (this.subscriptionsReady()) {
      notAuthorized()
    }
  });
});

Template.schoolEdit.helpers({
  school: function() {
    console.log(Schools.findOne({_id: Router.current().params.id}))
   	return Schools.findOne({_id: Router.current().params.id});
  }
});
