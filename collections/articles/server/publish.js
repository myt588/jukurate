const MAX_LOAD = 1000;

Meteor.publish('articles.all', function() {
	return Articles.find({
		removed_at: {$exists: false}
	},{
	  fields: Articles.publicFields
	});
});

Meteor.publish('articles.id', function(_id) {
	return Articles.find({
		_id: _id
	},{
	  fields: Articles.publicFields
	});
});

Meteor.publish('articles.limit', function(limit, filters, sort) {
  const options = {
  	sort: sort ? sort : {recommend_level : -1}, 
  	limit: Math.min(limit ? limit : 8, MAX_LOAD),
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Articles.find(filtersCopy, options, { fields: articles.publicFields });
});