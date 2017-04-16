Template.regularReviewList.onCreated(function() {
	let type = Template.instance().data.type;
	let id = Template.instance().data.id;
  this.subscribe('reviews.limit', 4, type, id);
});

Template.regularReviewList.events({

});

Template.regularReviewList.helpers({
  items() {
    return Reviews.find();
  },
  id() {
  	return Router.current().params.id
  }
});
  

    
