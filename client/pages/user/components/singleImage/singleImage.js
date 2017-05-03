Template.singleImage.onCreated(function(){
	this.default = ReactiveVar(this.data.default || 'DEFAULT');
	this.autorun(() => {
		Meteor.subscribe('files.images.thumbnail', Template.instance().data.id);
	});
});

Template.singleImage.helpers({
  image: function () {
  	const image = Files.findOne({
			'meta.ownerId': Template.instance().data.id, 
			'meta.isThumbnail': true
		});
    return image; 
  },
  defaultImage() {
  	return DEFAULT_IMAGES[Template.instance().default.get()];
  }
});
