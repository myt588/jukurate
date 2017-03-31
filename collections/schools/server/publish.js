Meteor.publish('schools.all', function() {
	return Schools.find({
		removed_at: {$exists: false}
	},{
	  fields: Schools.publicFields
	});
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

