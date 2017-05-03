Template.reviewHeader.onCreated(function() {
	this.item = ReactiveVar(this.data.item || false);
});

Template.reviewHeader.helpers({
	image() {
		let item = Template.instance().item.get();
		return item ? item._id : '';
	},
	title() {
		let item = Template.instance().item.get();
		return item ? item.itemTitle() : '';
	},
	subtitle() {
		let item = Template.instance().item.get();
		return item ? item.itemSubtitle() : '';
	},
	note() {
		let item = Template.instance().item.get();
		return item ? item.itemRibbon() : '';
	},
	zipcode() {
		if (Router.current().params.type == 'schools') {
			let item = Template.instance().item.get();
			return item ? item.location.postal_code : '';
		}
	},
	address() {
		if (Router.current().params.type == 'schools') {
			let item = Template.instance().item.get();
			return item ? item.address() : '';
		}
	}
});
