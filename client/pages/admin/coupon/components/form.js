AutoForm.hooks({
  insertCouponForm: {
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	    // You must call this.done()!
	    this.event.preventDefault();
	    Meteor.call('coupons.insert', insertDoc);
	    this.done();
	    Router.go('coupon_list');
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
  updateCouponForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      // You must call this.done()!
      this.event.preventDefault();
      insertDoc.id = Router.current().params.id
      Meteor.call('coupons.update', insertDoc);
      this.done();
      Router.go('coupon_list');
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

Template.couponForm.onCreated(function() {
	Meteor.subscribe('courses.all');
});

Template.couponForm.helpers({
	_optionsTag() {
		return _.map(TAGS || [], function (item) {
      return {label: item, value: item};
    });
	},
	_optionsCourse() {
		const courses = Courses.find({}).fetch();
		if (courses.length == 0) {
			return null;
		} else {
			return _.map(courses, function (item) {
	      return {label: item.title, value: item._id};
	    });
		}
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

