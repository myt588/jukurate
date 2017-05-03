import Cropper from 'cropperjs';
import '../../../../../../node_modules/cropperjs/dist/cropper.css';

Template.thumbnailCropper.onCreated(function() {
  this.croppedId = new ReactiveVar(false);
  this.cropped = new ReactiveVar(this.data.cropped || false);

  this.cropper = new ReactiveVar();
  this.ownerId = new ReactiveVar(this.data ? this.data.ownerId : 'admin');
  this.currentFile = new ReactiveVar(false);
  return;
});

Template.thumbnailCropper.onRendered(function () {
  var imageId = this.data.original._id;
  var image = document.getElementById(imageId);
  var preview = document.getElementById('preview');

  var cropper = new Cropper(image, {
    aspectRatio: 1 / 1,
    viewMode: 1,
    minContainerWidth: 250,
    minContainerHeight: 250,
    minCanvasWidth: 250,
    minCanvasHeight: 250,
    minCropBoxWidth: 150,
    minCropBoxHeight: 150,
    modal: true,
    ready: function () {
      croppable = true;
      var clone = this.cloneNode();
      clone.className = ''
      clone.style.cssText = (
        'display: block;' +
        'width: 100%;' +
        'min-width: 0;' +
        'min-height: 0;' +
        'max-width: none;' +
        'max-height: none;'
      );
      preview.appendChild(clone.cloneNode());
    },
    crop: function (e) {
      var data = e.detail;
      var cropper = this.cropper;
      var imageData = cropper.getImageData();
      var previewAspectRatio = data.width / data.height;

      var previewImage = preview.getElementsByTagName('img').item(0);
      var previewWidth = preview.offsetWidth;
      var previewHeight = previewWidth / previewAspectRatio;
      var imageScaledRatio = data.width / previewWidth;

      preview.style.height = previewHeight + 'px';
      if (previewWidth != 0) {
        previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
        previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
        previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
        previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
      }
    }
  });
  Template.instance().cropper.set(cropper);
});

Template.thumbnailCropper.events({
  'hidden.bs.modal #cropperModal': function(e, instance) {
    var cropper = instance.cropper.get();
    cropper.destroy();
  },
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

    // Upload
    let ownerId = '';
    if (Meteor.user().isSchoolAdmin()) {
      ownerId = Meteor.user().schoolId();
    } else {
      ownerId = instance.ownerId.get();
    }
    const result = Files.insert({
      file: croppedCanvas.toDataURL(),
      meta: {
        isThumbnail: true,
        original: instance.data.original._id,
        ownerId: ownerId
      },
      isBase64: true,
      fileName: 'pic.png',
      streams: 'dynamic',
      chunkSize: 'dynamic',
      onStart: function () {
        Meteor.call('removeOldThumbnail', ownerId);
        instance.currentFile.set(this);
      },
      onUploaded: function (error, fileObj) {
        if (error) {
          console.log(error)
        } else {
          $('#cropperModal').modal('hide');
        }
        instance.currentFile.set(false);
      },
    });
    instance.croppedId.set(result.config.fileId);
  }
});

Template.thumbnailCropper.helpers({
  croppedFile: function () {
    let cropped = Template.instance().cropped.get();
    if (cropped) {
      return cropped
    } else {
      return Files.findOne({
        _id: Template.instance().croppedId.get()
      });
    }
  },
  currentFile: function () {
    return Template.instance().currentFile.get();
  }
});


