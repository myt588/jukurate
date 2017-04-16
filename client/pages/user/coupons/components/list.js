Template.regularCouponList.onCreated(function(){
	this.subscribe('coupons.all');
});

Template.regularCouponList.helpers({
	items() {
		return Coupons.find({});
	}
});