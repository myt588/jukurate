Template.regularReviewItem.onCreated(function(){
	this.collectionName = () => {
    return this.data.review.owner_type;
  };
	this.inProfile = () => {
		return this.data.inProfile;
	};
	this.itemId = () => {
		return this.data.review.owner_id;
	};
	if (this.inProfile()) {
		let subscription = this.collectionName() + '.id';
		this.subscribe(subscription, this.itemId());
	} else {
		this.subscribe('users.all', {_id: Template.instance().data.review.created_by});
	}
});

Template.regularReviewItem.helpers({
  item() {
  	if (Template.instance().inProfile()) {
			return global[capitalizeFirstLetter(Template.instance().collectionName())].findOne();
	  } else {
	    return Meteor.users.findOne();
	  }
  },
  formatted_created_at(date = Template.instance().data.created_at) {
    return formatDate(date); 
  },
  defaultImage(){
  	if (Template.instance().inProfile()) {
			return Template.instance().collectionName().toUpperCase();
	  } else {
			return 'USER';
	  }
  },
  routeName(){
  	if (Template.instance().inProfile()) {
			return Template.instance().collectionName().toLowerCase().slice(0, -1) + '_detail_view';
		} else {
			return false;
		}
  }
});