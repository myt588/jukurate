Template.tags.onCreated(function(){
	this.subscribe('tags.schools');
	this.tags = ReactiveVar(this.data.items);
});

Template.tags.helpers({
	tagNames(){
		return _.map(Template.instance().tags.get(), function(item) {
			return Tags.findOne({_id: item});
		});
	}
});