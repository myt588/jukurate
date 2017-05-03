Template.sessionErrors.helpers({
	hasErrors(){
		return Session.get('error') ? true : false;
	},
	message(){
		return Session.get('error').reason;
	}
})