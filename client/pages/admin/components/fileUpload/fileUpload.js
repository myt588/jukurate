AutoForm.addInputType('fileUpload', {
  template: 'fileUpload'
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

Template.fileUpload.onCreated(function () {
  if (!this.data) {
    this.data = {
      atts: {}
    };
  }

  this.currentUpload  = new ReactiveVar(false);
  this.inputName      = this.data.name;
  this.fileId         = new ReactiveVar(this.data.value || false);
  return;
});

Template.fileUpload.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  fileId: function () {
    return Template.instance().fileId.get() || this.value;
  },
  uploadedFile: function () {
    return Images.findOne({
      _id: Template.instance().fileId.get() || this.value
    });
  }
});

Template.fileUpload.events({
  'click [data-reset-file]'(e, template) {
    e.preventDefault();
    template.fileId.set(false);
    return false;
  },
  'click [data-remove-file]'(e, template) {
    e.preventDefault();
    template.fileId.set(false);
    try {
      this.remove();
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
            template.fileId.set(fileObj._id);
          }
        }
        template.currentUpload.set(false);
        return;
      });

      upload.start();
    }
  }
});