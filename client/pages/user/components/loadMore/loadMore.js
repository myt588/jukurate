Template.loadMore.events({
	"click #loadMore"(e) {
		const name = 'load_more_' + Template.instance().data.name;
		const load = Session.get(name);
		Session.set(name, (load ? load : 3) + 3)
	}
});