import Cropper from 'cropperjs';
import '../../../../../node_modules/cropperjs/dist/cropper.css';

Template.thumbnailCropper.onCreated(function() {
  this.cropper = new ReactiveVar();
  this.croppedId = new ReactiveVar(false);
  this.cropped = new ReactiveVar(this.data.cropped || false);
  console.log('cropper', this.data)
  return;
});

Template.thumbnailCropper.onRendered(function () {
  var image = document.getElementById('image');
  var button = document.getElementById('crop');

  var cropper = new Cropper(image, {
    aspectRatio: 1 / 1,
    viewMode: 1,
    ready: function () {
      croppable = true;
    }
  });
  Template.instance().cropper.set(cropper);
});

Template.thumbnailCropper.events({
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
    $('.fu-cropped').val(result.config.fileId);
    instance.croppedId.set(result.config.fileId);
  }
});

Template.thumbnailCropper.helpers({
  croppedFile: function () {
    let cropped = Template.instance().cropped.get();
    if (cropped) {
      return cropped
    } else {
      return Images.findOne({
        _id: Template.instance().croppedId.get()
      });
    }
  },
});


