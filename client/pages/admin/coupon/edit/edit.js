Template.couponEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('coupons.id', this.getId());
  });
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

Template.couponEdit.helpers({
  coupon: function() {
   	return Coupons.findOne({_id: Router.current().params.id});
  }
});