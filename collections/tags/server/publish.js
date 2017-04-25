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

Meteor.publish('tags.schools', function(limit) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: Math.min(limit ? limit : 20, MAX_LOAD),
	};
	const filter = { type: 'schools', removed_at: {$exists: false} };
  return Tags.find(filter, options, { fields: Tags.publicFields });
});

Meteor.publish('tags.coupons', function(limit) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: Math.min(limit ? limit : 20, MAX_LOAD),
	};
	const filter = { type: 'coupons', removed_at: {$exists: false} };
  return Tags.find(filter, options, { fields: Tags.publicFields });
});

Meteor.publish('tags.tutors', function(limit) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: Math.min(limit ? limit : 20, MAX_LOAD),
	};
	const filter = { type: 'tutors', removed_at: {$exists: false} };
  return Tags.find(filter, options, { fields: Tags.publicFields });
});

Meteor.publish('tags.courses', function(limit) {
  const options = {
  	sort: {created_at: -1}, 
  	limit: Math.min(limit ? limit : 20, MAX_LOAD),
	};
	const filter = { type: 'courses', removed_at: {$exists: false} };
  return Tags.find(filter, options, { fields: Tags.publicFields });
});