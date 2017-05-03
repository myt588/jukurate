AutoForm.hooks({
  contact: {
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	    this.event.preventDefault();
	    Meteor.call('supports.insert', insertDoc, (error, result) => {
        if (error) {
          this.done(new Error(error));
        } else {
          this.done();
        }
      });
	  },
	  // Called when any submit operation succeeds
	  onSuccess: function(formType, result) {
      Bert.alert('Your Support Message has been sent successfully!', 'success' );
    },
	  // Called when any submit operation fails
	  onError: function(formType, error) {},
  }
});