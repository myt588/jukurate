Template.securityUserProfileTab.events({
	"click #resetButton": (e) => {
		Meteor.call( 'sendResetPasswordLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Reset Password Link sent to ${ email }!`, 'success' );
      }
    });
	}
});