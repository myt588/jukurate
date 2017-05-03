Template.uploadForm.onCreated(function(){

  this.ownerId = new ReactiveVar(this.data ? this.data.ownerId : 'admin');
  this.currentFile = new ReactiveVar(false);

  this.initiateUpload = (event, files, template) => {
    if (!files.length) {
      this.error.set('Please select a file to upload');
      return false;
    }
    if (files.length > 6) {
      this.error.set('Please select up to 6 files');
      return false;
    }

    const uploads = [];
    const transport = 'DDP';
    const ids = [];
    let ownerId = '';
    if (Meteor.user().isSchoolAdmin()) {
      ownerId = Meteor.user().schoolId();
    } else {
      ownerId = template.ownerId.get();
    }
    console.log(ownerId)
    _.each(files, (file, i) => {
      Files.insert({
        file: file,
        meta: {
          ownerId: ownerId,
        },
        streams: 'dynamic',
        chunkSize: 'dynamic',
        transport: transport,
      }, false).on('end', function (error, fileObj) {
        if (!error && files.length == (i+1)) {
          template.currentFile.set(false);
        } 
        // cleanUploaded(this);
      }).on('abort', function () {
        // cleanUploaded(this);
      }).on('error', function (error) {
        console.error(error);
        Meteor.setTimeout( () => {
          self.error.set(false);
        }, 10000);
        // cleanUploaded(this);
      }).on('start', function() {
        // uploads.push(this);
        // _app.uploads.set(uploads);
        template.currentFile.set(this);
      }).start();
    });
    return true;
  };
});

Template.uploadForm.helpers({
  currentFile: function () {
    return Template.instance().currentFile.get();
  }
});

Template.uploadForm.events({
  // Catch the dropped event
  'dropped #dropzone': function(e, template) {
    e.preventDefault();
    e.stopPropagation();
    template.initiateUpload(e, e.originalEvent.dataTransfer.files, template);
  },
  'click #uploadButton': function(e, template) {
    $('#imgupload').trigger('click'); 
  },
  'change #imgupload': function(e, template) {
    e.preventDefault();
    e.stopPropagation();
    template.initiateUpload(e, e.target.files, template);
  }
});