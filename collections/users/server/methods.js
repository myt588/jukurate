Meteor.methods({
  getUserIdByEmail(email) {
    var user = Meteor.users.findOne({'emails.0.address': email});
    return user;
  },
  assignAdmin(email, schoolId) {
    let user = Meteor.call('getUserIdByEmail', email);
    Roles.setUserRoles(user._id, 'school-admin', schoolId);
  },
  removeAdmin(userId, schoolId) {
    Roles.removeUsersFromRoles(userId, 'school-admin', schoolId);
  },
  getSchoolAdmin(id) {
  	return Roles.getUsersInRole('school-admin', id).fetch();
  },
  like(collection, id) {
    if (!this.userId) {
      throw new Meteor.Error("Not Logged In", 
        "The user must be logged in to like.");
      return
    }
    if (Meteor.user().liked(collection, id)) {
      throw new Meteor.Error("Already Liked", 
        "The user already liked this item.");
      return
    }
    Meteor.users.update(this.userId, {$push: {likes: {collection: collection, id: id}}}, (err, result) => {
      if (err) {

      } else {
        global[collection].update(id, {
          $inc: {'sort.likes': 1}
        });
      }
    });
  },
  unlike(collection, id) {
    if (!this.userId) {
      throw new Meteor.Error("Not Logged In", 
        "The user must be logged in to unlike.");
      return
    }
    if (!Meteor.user().liked(collection, id)) {
      throw new Meteor.Error("Already unLiked", 
        "The user already unliked this item.");
      return
    }
    Meteor.users.update(this.userId, {$pull: {likes: {collection: collection, id: id}}}, (err, result) => {
      if (err) {

      } else {
        global[collection].update(id, {
          $inc: {'sort.likes': -1}
        });
      }
    });
  },
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  },
  sendResetPasswordLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendResetPasswordEmail( userId );
    } 
  },
});