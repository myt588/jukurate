Template.userProfile.onCreated(function(){
	this.selectedTab = ReactiveVar('profile');
	this.subscribe('user.data');
});

Template.userProfile.events({
	'click #likes, click #profile, click #security, click #reviews': (e, template) => {
		template.selectedTab.set(e.currentTarget.id);
	}
});

Template.userProfile.helpers({
	isActive(item){
		return item == Template.instance().selectedTab.get() ? 'active' : ''
	},
	templateName(){
		return Template.instance().selectedTab.get() + 'UserProfileTab';
	}
});