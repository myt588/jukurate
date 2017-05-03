Meteor.methods({
  removeOldThumbnail(ownerId) {
    Files.find({'meta.ownerId': ownerId, 'meta.isThumbnail': {$exists: true}}).remove();
  },
});