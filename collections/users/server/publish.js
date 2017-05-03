let UserPublicFields = {
	'profile': 1,
	'roles': 1,
  'emails': 1,
  'likes': 1
};

Meteor.publish('users.all', function(filters) {
  return Meteor.users.find(filters, { fields: UserPublicFields });
});

Meteor.publish('users.schoolAdmin', function(_id) {
  return Roles.getUsersInRole('school-admin', _id, { fields: UserPublicFields });
});

Meteor.publish('users.id', function(_id) {
	return Meteor.users.find({ _id: _id },{ fields: UserPublicFields });
});

Meteor.publish('users.email', function(email) {
	return Meteor.users.find({ emails: {$in: [email]} },{ fields: UserPublicFields });
});

Meteor.publish("user.data", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, { fields: UserPublicFields });
  } else {
    this.ready();
  }
});

