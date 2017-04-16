Template.couponEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('coupons.id', this.getId());
  });
});

Template.couponEdit.helpers({
  coupon: function() {
   	return Coupons.findOne({_id: Router.current().params.id});
  }
});