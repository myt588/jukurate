Template.fileList.onCreated(function(){
  this.original = ReactiveVar(false);
  this.toggle = ReactiveVar(false);
  this.autorun(() => {
  	this.subscribe('files.images.byOwner', this.data.ownerId);
  })
});

Template.fileList.helpers({
	images(){
		return Files.find().each();
	},
  original(){
    return Template.instance().original.get();
  },
  toggle(){
    return Template.instance().toggle.get();
  },
  isThumbnail(image){
    return image.meta.isThumbnail ? "jk-thumbnail" : "";
  }
});

Template.fileList.events({
	'click .close': function(e, temp) {
    console.log(this)
    try {
      this.remove()
    } catch (error) {
      // we're good here
    }
    return false;
  },
  'click .showCropper': function(e, temp) {
    temp.original.set(this);
    temp.toggle.set(true);
    Meteor.setTimeout( () => {
      $('#cropperModal').modal('toggle');
    }, 100);
  },
  'hidden.bs.modal #cropperModal': function(e, temp) {
    temp.toggle.set(false);
    temp.original.set(false);
  }
});