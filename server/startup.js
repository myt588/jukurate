import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	process.env.MAIL_URL = "smtp://postmaster%40email.jukurate.com:5c6a902d26a7bda7cf0b602a54070c90@smtp.mailgun.org:587";
	// Meteor.call('factory');
	// _.each(TAGS, function(item){
	// 	Tags.insert({name: item, type:'schools'});
	// });

	// var users = [
	//     {name:"Normal User",email:"normal@example.com",roles:[]},
	//     {name:"Normal2 User",email:"normal2@example.com",roles:[]},
	//    	{name:"School Admin User",email:"school@example.com",roles:[]},
	//     {name:"Web Admin User",email:"admin@example.com",roles:['admin']},
	//   ];
	
	// _.each(users, function (user) {
	//   var id;
	//   id = Accounts.createUser({
	//     email: user.email,
	//     password: "apple1",
	//     profile: { name: user.name },
	//   });
	  
	// 	if (user.roles.length > 0) {
	//     // Need _id of existing user record so this call must come
	//     // after `Accounts.createUser` or `Accounts.onCreate`
	//     Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
	//   }
	// });
});