Meteor.publish('reviews.all', function() {
	return Reviews.find({
		removed_at: {$exists: false}
	},{
	  fields: Reviews.publicFields
	});
});

Meteor.publish('reviews.id', function(_id) {
	return Reviews.find({
		_id: _id
	},{
	  fields: Reviews.publicFields
	});
});

Meteor.publish('reviews.limit', function(limit=4) {
  const options = {
  	sort: {createdAt: -1}, 
  	limit: limit
	};
  return Reviews.find({}, options, { fields: Reviews.publicFields });
});

