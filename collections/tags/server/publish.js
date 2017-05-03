const MAX_LOAD = 1000;

Meteor.publish('tags.all', function() {
	return Tags.find({
		removed_at: {$exists: false}
	},{
	  fields: Tags.publicFields
	});
});

Meteor.publish('tags.id', function(_id) {
	return Tags.find({
		_id: _id
	},{
	  fields: Tags.publicFields
	});
});

Meteor.publish('tags.limit', function(limit, filters) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: Math.min(limit ? limit : 8, MAX_LOAD),
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Tags.find(filtersCopy, options, { fields: Tags.publicFields });
});
