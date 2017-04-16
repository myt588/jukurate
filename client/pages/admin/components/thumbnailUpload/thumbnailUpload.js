import Cropper from 'cropperjs';
import '../../../../../node_modules/cropperjs/dist/cropper.css';

AutoForm.addInputType('thumbnailUpload', {
  template: 'thumbnailUpload'
});

Template.thumbnailUpload.onCreated(function() {
  this.cropper = new ReactiveVar();
  return;
});

Template.thumbnailUpload.onRendered(function () {
  var image = document.getElementById('image');
  var button = document.getElementById('upload');

  var cropper = new Cropper(image, {
    aspectRatio: 1 / 1,
    viewMode: 1,
    ready: function () {
      croppable = true;
    }
  });
  Template.instance().cropper.set(cropper);
});

Template.thumbnailUpload.events({
  'click #upload'(e, instance) {
    e.preventDefault();
    var cropper = instance.cropper.get();
    var croppedCanvas;
    var croppedImage;
    if (!croppable) {
      return;
    }
    // Crop
    croppedCanvas = cropper.getCroppedCanvas();
    // Show
    croppedImage = document.getElementById('thumbnail');
    croppedImage.src = croppedCanvas.toDataURL();
    croppedImage.type = '';
    // upload
    const result = Images.insert({
      file: croppedImage.src,
      isBase64: true,
      fileName: 'pic.png',
      streams: 'dynamic',
      chunkSize: 'dynamic'
    });
    $('#thumbnail_input').val(result.config.fileId);
  }
});

Template.thumbnailUpload.helpers({
  uploadedFile: function () {
    return Images.findOne({
      _id: $('#thumbnail_input').val()
    });
  }
});


