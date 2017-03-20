Meteor.publish('schools', function() {
	return Schools.find({removed_at: {$exists: false}});
});

// Meteor.publish('schools.id', function(_id) {
//   return Lists.find(_id);
// });

// Meteor.publish('items.inList', function(list_id) {
//   return Items.find({
//     list_id: list_id
//   });
// });

