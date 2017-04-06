Template.schoolReviewList.onCreated(function() {
  this.subscribe('reviews.limit');
});

Template.schoolReviewList.onRendered(function() {

});

Template.schoolReviewList.events({

});

Template.schoolReviewList.helpers({
  items() {
    return Reviews.find();
  },
  id() {
  	return Router.current().params.id
  },
  mood(rating = Template.instance().data.rating) {
    rating = Math.ceil(rating);
    const dict = {
      1 : 'icon-mad',
      2 : 'icon-wondering',
      3 : 'icon-neutral',
      4 : 'icon-smile',
      5 : 'icon-happy'
    };
    return dict[rating];
  }
});
  

    
