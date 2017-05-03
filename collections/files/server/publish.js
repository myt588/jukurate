Meteor.publish('files.images.all', function () {
  return Files.collection.find({});
});

Meteor.publish('files.images.id', function(_id) {
	return Files.collection.find({
		_id: _id
	});
});

Meteor.publish('files.images.byOwner', function(ownerId) {
	filter = {
		'meta.ownerId': ownerId,
	}
	return Files.collection.find(filter);
});

Meteor.publish('files.images.thumbnail', function(ownerId) {
	filter = {
		'meta.ownerId': ownerId, 
		'meta.isThumbnail': true
	};
	return Files.collection.find(filter);
});