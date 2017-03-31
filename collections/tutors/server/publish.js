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