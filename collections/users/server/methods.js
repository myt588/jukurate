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
  }
});