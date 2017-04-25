Template.tutorListView.events({
	"click #more_tutors"(e) {
		const load = Session.get('load_more');
		Session.set('load_more', (load ? load : 8) + 8)
	}
});