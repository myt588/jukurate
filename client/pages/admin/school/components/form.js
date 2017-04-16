SimpleSchema.debug = true
AutoForm.hooks({
  insertSchoolForm: {
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	    // You must call this.done()!
	    this.event.preventDefault();
	    Meteor.call('schools.insert', insertDoc);
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

AutoForm.hooks({
  updateSchoolForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      console.log('t')
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

Template.schoolForm.onCreated(function() {
	Meteor.subscribe('images');
});

Template.schoolForm.helpers({
	_optionsTag() {
		return _.map(TAGS || [], function (item) {
      return {label: item, value: item};
    });
	},
	_optionsAmen() {
		return _.map(AMENITIES || [], function (item) {
      return {label: item, value: item};
    });
	},
	_sOptions() {
		return {
			hideSelected: true,
	    plugins: {
	      "remove_button": {}
	    }
	  }
	},
	_settings() {
		return {
	    toolbar: [
		    ['style', ['bold', 'italic', 'underline', 'clear']],
		    ['para', ['ul', 'ol', 'paragraph']],
		    ['misc', ['fullscreen', 'codeview', 'undo', 'redo']]
		  ]
	  }
	},
});

