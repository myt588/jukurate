Template.alert.helpers({
	show() {
		return Session.get('alert') == undefined ? false : true;
	},
	type() {
		return Session.get('alert')[0];
	},
	message() {
		return Session.get('alert')[1];
	}
})