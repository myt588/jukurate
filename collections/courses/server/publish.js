Meteor.publish('courses.all', function() {
	return Courses.find({
		removed_at: {$exists: false}
	},{
	  fields: Courses.publicFields
	});
});

Meteor.publish('courses.id', function(_id) {
	return Courses.find({
		_id: _id 
	},{
	  fields: Courses.publicFields
	});
});