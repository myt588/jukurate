const MAX_LOAD = 30;

Meteor.publish('schools.all', function() {
	return Schools.find({
		removed_at: {$exists: false}
	},{
	  fields: Schools.publicFields
	});
});

Meteor.publish('schools.nameList', function() {
	return Schools.find({
		removed_at: {$exists: false}
	},{
	  fields: {name: 1}
	});
});

Meteor.publish('schools.limit', function(limit, filters, sort) {
	const options = {
  	sort: sort ? sort : {recommend_level : -1}, 
  	limit: Math.min(limit ? limit : 4, MAX_LOAD)
	};
	console.log(options)
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
	return Schools.find(filtersCopy, options, { fields: Schools.publicFields });
});

Meteor.publish('schools.id', function(_id) {
	return Schools.find({
		_id: _id 
	},{
	  fields: Schools.publicFields
	});
});

Meteor.publish('schools.top', function() {
	return Schools.find({
		top: true 
	},{
	  fields: Schools.publicFields
	});
});

