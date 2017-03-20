AutoForm.hooks({
  updateSchoolForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      // You must call this.done()!
      this.event.preventDefault();
      insertDoc.id = Router.current().params.id
      Meteor.call('schools.update', insertDoc);
      this.done();
      Router.go('school_list');
      //this.done(); // submitted successfully, call onSuccess
      //this.done(new Error('foo')); // failed to submit, call onError with the provided error
      //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
    },
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {},

    // Called when any submit operation fails
    onError: function(formType, error) {},
  }
});

Template.schoolEdit.helpers({
  school: function() {
   	return Schools.findOne({_id: Router.current().params.id});
  }
});