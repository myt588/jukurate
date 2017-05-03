Template.homeTagList.onCreated(function() {
	this.showedMore = new ReactiveVar(false)
	this.autorun(()=>{
    const filters = {  };
    this.subscribe('tags.limit', 12, filters);
  });
});

Template.homeTagList.events({
	'click .more-categories':(e, temp) => {
    var _ = $(".search-categories");
    _.stop().animate({"max-height" : 800},{duration:600});
		temp.showedMore.set(true)
	},
	'click .minus-categories':(e, temp) => {
    var _ = $(".search-categories");
    _.stop().animate({"max-height" : [93, 'easeOutExpo']},{duration:600});
		temp.showedMore.set(false)
	}
})

Template.homeTagList.helpers({
	tags() {
		return Tags.find().fetch();
	},
	showedMore() {
		return Template.instance().showedMore.get();
	},
	routeName() {
		return this.type.slice(0, -1) + '_list_view';
	}
})