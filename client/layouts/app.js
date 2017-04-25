Template.dashboardLayout.onCreated(function() {
	this.autorun(() => {
		this.subscribe('user.data');
		if (this.subscriptionsReady()) {
			const user = Meteor.user();
			console.log(user)
			if (!user) {
				console.log("not logged in", user)

		    Router.go('home');
		  } else if ( !user.hasOwnProperty('roles')) {
		  	console.log("do not have access", user)

		  	Router.go('home');
		  } else if ( !user.isAdmin() ) {
		    console.log("user not admin", user)

		    Router.go('home');
			}
		}
	});
});

Template.dashboardLayout.onRendered(function() {

});
