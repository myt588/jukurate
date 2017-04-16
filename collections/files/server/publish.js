Meteor.publish('files.images.all', function () {
  return Images.collection.find({});
});

Meteor.publish('files.images.id', function(_id) {
	return Images.collection.find({
		_id: _id
	});
});