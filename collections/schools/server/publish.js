const MAX_LOAD = 30;

Meteor.publish('schools.all', function() {
	return Schools.find({
		removed_at: {$exists: false}
	},{
	  fields: Schools.publicFields
	});
});

Meteor.publish('schools.limit', function(limit=10, filters) {
	const options = {
  	sort: {created_at: -1}, 
  	limit: Math.min(limit, MAX_LOAD)
	};
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

// Meteor.publish('schools.id', function(_id) {
//   return Lists.find(_id);
// });

// Meteor.publish('items.inList', function(list_id) {
//   return Items.find({
//     list_id: list_id
//   });
// });

