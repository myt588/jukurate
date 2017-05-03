Schema.Files = new SimpleSchema({
  size: {
    type: Number
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  path: {
    type: String
  },
  isVideo: {
    type: Boolean
  },
  isAudio: {
    type: Boolean
  },
  isImage: {
    type: Boolean
  },
  isText: {
    type: Boolean
  },
  isJSON: {
    type: Boolean
  },
  isPDF: {
    type: Boolean
  },
  extension: {
    type: String,
    optional: true
  },
  _storagePath: {
    type: String
  },
  _downloadRoute: {
    type: String
  },
  _collectionName: {
    type: String
  },
  public: {
    type: Boolean,
    optional: true
  },
  meta: {
    type: Object,
    blackbox: true,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  versions: {
    type: Object,
    blackbox: true
  }
});

Files = new FilesCollection({
  collectionName: 'files',
  storagePath: './public/uploads/',
  allowClientCode: true, // Required to let you remove uploaded file
  cacheControl: 'public, max-age=31536000',
  // debug: true,
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
    if (this.userId) {
      var user = this.user();
      if (user.isAdmin()) {
        // Allow upload only if
        // current user is signed-in
        // and has role is `admin`
        return true;
      }
    } else {
      return "Not enough rights to upload a file!";
    }
  }
});

Files.collection.attachSchema( Schema.Files );


