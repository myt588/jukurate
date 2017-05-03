Template.profileUserProfileTab.onCreated(function() {
	this.upload = ReactiveVar(false);
});

Template.profileUserProfileTab.events({
	"click .upload-button": (e, template) => {
		template.upload.set(!template.upload.get());
	}
});

Template.profileUserProfileTab.helpers({
	upload(){
		return Template.instance().upload.get();
	}
});

