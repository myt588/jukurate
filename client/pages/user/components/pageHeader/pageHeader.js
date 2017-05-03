Template.pageHeader.helpers({
	imageURL(){
		var name = Template.instance().data.title;
		return '/assets/images/backgrounds/' + name + '.jpg';
	}
});