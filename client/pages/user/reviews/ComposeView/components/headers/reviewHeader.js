Template.reviewHeader.helpers({
	image() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.logo_url;
		}
		if (Router.current().params.type == 'tutors') {
			return Template.instance().data.item.avatar_url;
		}
	},
	title() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.name;
		}
		if (Router.current().params.type == 'tutors') {
			return Template.instance().data.item.name;
		}
	},
	subtitle() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.station;
		}
		if (Router.current().params.type == 'tutors') {
			return Template.instance().data.item.college;
		}
	},
	note() {
		if (Router.current().params.type == 'schools') {
			return Template.instance().data.item.walking_distance + ' min';
		}
		if (Router.current().params.type == 'tutors') {
			return Template.instance().data.item.college_major;
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
