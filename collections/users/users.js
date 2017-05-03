Meteor.users.deny({
  update: function() {
    return true;
  }
});

Schema.UserProfile = new SimpleSchema({
  name: {
    type: String,
  },
  thumbnail: {
    type: String,
    optional: true
  }
});

Schema.User = new SimpleSchema({
  emails: {
    type: Array,
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  'registered_emails.$': {
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  likes: {
    type: [Object],
    optional: true,
    blackbox: true
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema( Schema.User );

Meteor.users.helpers({
  itemTitle() {
    return this.name();
  },
	name() {
		return this.profile.name;
	},
  email() {
    return this.emails[0].address;
  },
  likesCount() {
    return this.likes ? this.likes.length : 0;
  },
  isSchoolAdmin() {
    return Roles.userIsInRole(this, ['school-admin'], this.schoolId());
  },
  isWebAdmin() {
    return Roles.userIsInRole(this, ['admin']);
  },
  isAdmin() {
    return this.isSchoolAdmin() || this.isWebAdmin();
  },
  schoolId() {
    let id = '';
    for (key in this.roles) {
      id = key;
      break
    }
    return id;
  },
  liked(collection, id) {
    return _.find(this.likes, function(like){ return like.collection == collection && like.id == id}) != undefined;
  }
});