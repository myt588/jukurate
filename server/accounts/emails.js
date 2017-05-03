Accounts.emailTemplates.siteName = "Meteor Guide Todos Example";
Accounts.emailTemplates.from = "Meteor Todos Accounts <accounts@example.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[GoDunk] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@godunk.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};

Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return "Reset your password on Meteor Todos";
  },
  text(user, url) {
    let urlWithoutHash = url.replace( '#/', '' );
    return `Hello!
    Click the link below to reset your password on Meteor Todos.
    ${urlWithoutHash}
    If you didn't request this email, please ignore it.
    Thanks,
    The Meteor Todos team
    `
  },
  html(user, url) {

  }
};