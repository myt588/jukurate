Meteor.publish('reviews.all', function() {
	return Reviews.find({
		removed_at: {$exists: false}
	},{
	  fields: Reviews.publicFields
	});
});

Meteor.publish('reviews.bySchool', function(schoolId) {
	return Reviews.find({
		school_id: schoolId,
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

Meteor.publish('reviews.limit', function(limit, filters) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: limit,
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Reviews.find(filtersCopy, options, { fields: Reviews.publicFields });
});

