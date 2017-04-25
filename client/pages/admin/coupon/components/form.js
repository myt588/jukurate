Template.couponForm.onCreated(function() {
});

Template.couponForm.helpers({
	_settings() {
		return textAreaSettings();
	},
});

AutoForm.hooks({
  insertCouponForm: {
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	    // You must call this.done()!
	    this.event.preventDefault();
      if (Meteor.user().isSchoolAdmin()) {
        insertDoc.school_id = Meteor.user().schoolId();
      }
	    Meteor.call('coupons.insert', insertDoc, (error, result) => {
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
      Router.go('coupon_list');
    },
	  // Called when any submit operation fails
	  onError: function(formType, error) {},
  },
  updateCouponForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      // You must call this.done()!
      this.event.preventDefault();
      insertDoc.id = Router.current().params.id
      Meteor.call('coupons.update', insertDoc, (error, result) => {
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
      Router.go('coupon_list');
    },
    // Called when any submit operation fails
    onError: function(formType, error) {},
  }
});


