Template.reviewHeader.helpers({
	logo_url() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.logo_url;
		}
	},
	title() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.name;
		}
	},
	subtitle() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.station;
		}
	},
	note() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.walking_distance;
		}
	},
	zipcode() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.zipcode;
		}
	},
	address() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.address;
		}
	}

});
