Template.couponShow.onCreated(function() {
  this.autorun(() => {
    this.subscribe('coupons.id', {_id: Router.current().params.id});
  });
})