let UserPublicFields = {
	'profile': 1
};

Meteor.publish('users.all', function() {
  return Meteor.users.find({}, { fields: UserPublicFields });
});

Meteor.publish('users.id', function(_id) {
	return Meteor.users.find({ _id: _id },{ fields: UserPublicFields });
});

