Template.nav.events({
	"click #logout"(e) {
		e.preventDefault();
		AccountsTemplates.logout();
	},
	"click #navbar_item"(e) {
		resetSessions();
	},
});