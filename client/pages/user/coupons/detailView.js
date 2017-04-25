Template.couponDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('coupons.id', this.getId());
  });
});

Template.couponDetailView.helpers({
	coupon() {
		return Coupons.findOne({_id: Router.current().params.id});
	},
	courseFilter(coupon) {
    return {_id: {$in: coupon.course_ids}};
  }
});
    
    
