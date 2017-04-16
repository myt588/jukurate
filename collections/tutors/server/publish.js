Meteor.publish('tutors.all', function() {
	return Tutors.find({
		removed_at: {$exists: false}
	},{
	  fields: Tutors.publicFields
	});
});

Meteor.publish('tutors.id', function(_id) {
	return Tutors.find({
		_id: _id 
	},{
	  fields: Tutors.publicFields
	});
});

Meteor.publish('tutors.limit', function(limit=10, filters) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: limit,
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Tutors.find(filtersCopy, options, { fields: Tutors.publicFields });
});