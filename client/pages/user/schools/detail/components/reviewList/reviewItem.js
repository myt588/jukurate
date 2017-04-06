Template.schoolReviewItem.onCreated(function(){
  this.autorun(() => {
    this.subscribe('users.all', {_id: Template.instance().data.created_by});
  });
});

Template.schoolReviewItem.helpers({
  user() {
    return Meteor.users.findOne(Template.instance().data.created_by)
  },
  formatted_created_at(date = Template.instance().data.created_at) {
    return moment(date).format("dddd, DD/MM/YYYY, h:mm:ss a"); 
  }
});