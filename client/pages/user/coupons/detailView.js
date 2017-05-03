Template.couponDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('coupons.id', this.getId());
  });
});

Template.couponDetailView.events({
  "click #top"(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
  },
  "click #godesc, click #gotutor, click #goprice, click #gocourse, click #gorev"(e) {
    e.preventDefault();
    const id = '#'+ e.target.id.substring(2);
    $('html, body').stop().animate({
      scrollTop: $(id).offset().top - 124
    }, 600);
    // $('[data-toggle="tooltip"]').tooltip('hide');
  }
});

Template.couponDetailView.helpers({
	coupon() {
		return Coupons.findOne({_id: Router.current().params.id});
	},
	courseFilter(coupon) {
    return {_id: {$in: coupon.course_ids}};
  }
});
    
    
