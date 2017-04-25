Template.couponListView.events({
	"click #more_courses"(e) {
		const load = Session.get('load_more_coupons');
		Session.set('load_more_coupons', (load ? load : 8) + 8)
	}
});