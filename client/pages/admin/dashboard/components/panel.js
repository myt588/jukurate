Template.dashboardPanel.onCreated(function(){
	this.collectionName = () => {
    return this.data.title;
  }
	this.autorun(()=>{
		const subscription = this.collectionName().toLowerCase() + '.limit';
		if (Meteor.user().isSchoolAdmin()) {
			this.subscribe(subscription, 1000, {school_id: Meteor.user().schoolId()});
		} else {
			this.subscribe(subscription, 1000);
		}
	});
});

Template.dashboardPanel.helpers({
	count(){
		return global[Template.instance().collectionName()].find().count();
	}
});

