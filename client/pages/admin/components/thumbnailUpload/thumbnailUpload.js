AutoForm.addInputType('thumbnailUpload', {
  template: 'thumbnailUpload',
  valueOut: function() {
    node = $(this.context);
    let original = node.find('.fu-original').val();
    let cropped = node.find('.fu-cropped').val();
    return {
      original: original,
      cropped: cropped,
    };
  }
});

AutoForm._globalHooks.onSuccess.push(function (type) {
  if (type === 'insert') {
    try {
      if (this.template) {
        this.template.$('[data-reset-file]').click();
      }
    } catch (e) {
      // we're good here
    }
  }
});

Template.thumbnailUpload.onCreated(function () {
  if (!this.data) {
    this.data = {
      atts: {}
    };
  }
  console.log('thumbnailUpload', this.data)
  this.inputName      = this.data.name;
  this.currentUpload  = new ReactiveVar(false);
  this.originalId     = new ReactiveVar(this.data.value.original || false);
  this.croppedId      = new ReactiveVar(this.data.value.cropped || false);
  this.subscribe('files.images.all');
  return;
});

Template.thumbnailUpload.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  uploadedFile: function () {
    let image = Images.findOne({
      _id: Template.instance().originalId.get() || this.value.original
    });
    let cropped = Images.findOne({
      _id: Template.instance().croppedId.get() || this.value.cropped
    });
    if (image || cropped) {
      return {image: image, cropped: cropped};
    } else {
      return null;
    }
    
  },
  schemaKey: function() {
    return Template.instance().data.atts['data-schema-key'];
  },
  croppedId() {
    return Template.instance().croppedId.get() ? Template.instance().croppedId.get() : '';
  },
  originalId() {
    return Template.instance().originalId.get() ? Template.instance().originalId.get() : '';
  }
});

Template.thumbnailUpload.events({
  'click [data-remove-file]'(e, template) {
    e.preventDefault();
    template.originalId.set(false);
    try {
      console.log(this)
      if (this.image) {
        this.image.remove();
      } 
      if (this.cropped) {
        this.cropped.remove();
      }
    } catch (error) {
      // we're good here
    }
    return false;
  },
  'change [data-files-collection-upload]'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        // AutoForm.getValidationContext().reset();
        template.currentUpload.set(this);
        return;
      });

      upload.on('error', function (error) {
        AutoForm.getValidationContext().reset();
        AutoForm.getValidationContext().addInvalidKeys([{name: Template.instance().inputName, type: 'uploadError', value: error.reason}]);
        $(e.currentTarget).val('');
        return;
      });

      upload.on('end', function (error, fileObj) {
        if (!error) {
          if (template) {
            template.originalId.set(fileObj._id);
          }
        }
        template.currentUpload.set(false);
        return;
      });

      upload.start();
    }
  }
});