Template.couponDetailView.onCreated(function(){
	this.subscribe('coupons.id', Router.current().params.id);
});

Template.couponDetailView.helpers({
	coupon() {
		return Coupons.findOne({_id: Router.current().params.id});
	}
});
    
    
