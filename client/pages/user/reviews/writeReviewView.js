Template.writeReviewView.onCreated(function(){
  this.autorun(() => {
  	let subscription = Router.current().params.type + '.id';
    this.subscribe(subscription, Router.current().params.id);
  });
});

Template.writeReviewView.helpers({
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
			return ['environment', 'location', 'price'];
		}
		if (type == 'courses') {
			return ['environment', 'location', 'price'];
		}
		if (type == 'coupons') {
			return ['environment', 'location', 'price'];
		}
		if (type == 'tutors') {
			return ['environment', 'location', 'price'];
		}
	}
});