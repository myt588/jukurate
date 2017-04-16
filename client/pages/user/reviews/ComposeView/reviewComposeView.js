Template.reviewComposeView.onCreated(function(){
  this.autorun(() => {
  	let subscription = Router.current().params.type + '.id';
    this.subscribe(subscription, Router.current().params.id);
  });
});

Template.reviewComposeView.helpers({
	_id() {
		return Router.current().params.id;
	},
	review_item() {
		let type = Router.current().params.type;
		let id = Router.current().params.id;
		if (type == 'schools') {
			return Schools.findOne({_id: id});
		}
		if (type == 'courses') {
			return Courses.findOne({_id: id});
		}
		if (type == 'coupons') {
			return Coupons.findOne({_id: id});
		}
		if (type == 'tutors') {
			return Tutors.findOne({_id: id});
		}
	},
	review_attributes() {
		let type = Router.current().params.type;
		let id = Router.current().params.id;
		if (type == 'schools') {
			return REVIEW_TYPE.SCHOOL;
		}
		if (type == 'courses') {
			return REVIEW_TYPE.COURSE;
		}
		if (type == 'coupons') {
			return REVIEW_TYPE.COUPON;
		}
		if (type == 'tutors') {
			return REVIEW_TYPE.TUTOR;
		}
	}
});