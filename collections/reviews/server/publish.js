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

Meteor.publish('reviews.limit', function(limit=4, type, id) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: limit,
	};
  return Reviews.find({
  	removed_at: {$exists: false},
  	owner_type: type,
  	owner_id: id,
  }, options, { fields: Reviews.publicFields });
});

