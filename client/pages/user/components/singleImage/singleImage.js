Template.singleImage.onCreated(function(){
  Meteor.subscribe('files.images.id', Template.instance().data.id);
});

Template.singleImage.helpers({
  image: function () {
  	const image = Images.findOne({_id:Template.instance().data.id})
    return image; 
  }
});
