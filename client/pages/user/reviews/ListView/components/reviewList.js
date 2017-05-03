Template.regularReviewList.onCreated(function() {
	let type = Template.instance().data.type;
	let id = Template.instance().data.id;
	let userId = Template.instance().data.userId;
	this.autorun( () => {
		let load = Session.get('load_more_reviews') ? Session.get('load_more_reviews') : 3;
		if (type && id) {
			let filters = {
				owner_id: id,
				owner_type: type,
			}
		  this.subscribe('reviews.limit', load, filters);
		}
		if (userId) {
			let filters = {
				created_by: userId,
			}
			this.subscribe('reviews.limit', load, filters);
		}
	});
});

Template.regularReviewList.events({

});

Template.regularReviewList.helpers({
  items() {
    return Reviews.find();
  },
  id() {
  	return Router.current().params.id
  },
});
  

    
