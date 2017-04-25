SimpleSchema.debug = true

Template.schoolForm.onCreated(function() {
});

Template.schoolForm.onRendered(function() {
});

Template.schoolForm.helpers({
	_optionsAmen() {
		return _.map(AMENITIES || [], function (item) {
      return {label: item, value: item};
    });
	},
	_selOptions() {
		return {
			hideSelected: true,
	    plugins: {
	      "remove_button": {}
	    }
	  }
	},
	_settings() {
		return textAreaSettings();
	},
});

AutoForm.hooks({
  insertSchoolForm: {
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	    // You must call this.done()!')
	    this.event.preventDefault();
	    console.log(insertDoc)
	    Meteor.call('schools.insert', insertDoc, (error, result) => {
				if (error) {
					console.log(error)
					this.done(new Error(error));
				} 
	    });
	    this.done();
	    //this.done(); // submitted successfully, call onSuccess
	    //this.done(new Error('foo')); // failed to submit, call onError with the provided error
	    //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
	  },
	  // Called when any submit operation succeeds
	  onSuccess: function(formType, result) {
	  	Router.go('school_list');
	  },
	  // Called when any submit operation fails
	  onError: function(formType, error) {},
  },
  updateSchoolForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
        // You must call this.done()!
        this.event.preventDefault();
        if (Meteor.user().isSchoolAdmin()) {
          insertDoc.id = Meteor.user().schoolId();
        } else {
          insertDoc.id = Router.current().params.id;
        }
        console.log(insertDoc)
        Meteor.call('schools.update', insertDoc, (error, result) => {
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
        if (Meteor.user().isSchoolAdmin()) {
          let alert = ['success', 'Update is complete!'];
          Session.set('alert', alert);
        } else {
          Router.go('school_list');
        }
      },

      // Called when any submit operation fails
      onError: function(formType, error) {
        let alert = ['error', 'There is a problem!'];
        Session.set('error', alert);
      },
    }
});

