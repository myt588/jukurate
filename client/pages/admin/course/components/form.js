Template.courseForm.onCreated(function() {
});

Template.courseForm.helpers({
	_settings() {
		return textAreaSettings();
	},
});

AutoForm.hooks({
  insertCourseForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      // You must call this.done()!
      this.event.preventDefault();
      if (Meteor.user().isSchoolAdmin()) {
        insertDoc.school_id = Meteor.user().schoolId();
      }
      Meteor.call('courses.insert', insertDoc, (error, result) => {
        if (error) {
          this.done(new Error(error));
        } else {
          this.done();
        }
      });
      //this.done(); // submitted successfully, call onSuccess
      //this.done(new Error('foo')); // failed to submit, call onError with the provided error
      //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
    },

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      Router.go('course_list');
    },

    // Called when any submit operation fails
    onError: function(formType, error) {},

  },
  updateCourseForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      // You must call this.done()!
      this.event.preventDefault();
      insertDoc.id = Router.current().params.id;
      Meteor.call('courses.update', insertDoc, (error, result) => {
        if (error) {
          this.done(new Error(error));
        } else {
          this.done();
        }
      });
      //this.done(); // submitted successfully, call onSuccess
      //this.done(new Error('foo')); // failed to submit, call onError with the provided error
      //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
    },
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      Router.go('course_list');
    },

    // Called when any submit operation fails
    onError: function(formType, error) {},
  }
});