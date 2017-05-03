AutoForm.hooks({
  insertTagForm: {
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	    // You must call this.done()!
	    this.event.preventDefault();
	    Meteor.call('tags.insert', insertDoc);
	    this.done();
	    Router.go('tag_list');
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

Template.tagCreate.onCreated(function() {
  if (this.subscriptionsReady()) {
		notAuthorized()
	}
});