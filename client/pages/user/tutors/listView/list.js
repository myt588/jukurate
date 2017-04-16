Template.tutorListView.events({
	"click #more_tutors"(e) {
		const load = Session.get('load_more_tutors');
		Session.set('load_more_tutors', (load ? load : 8) + 8)
	}
});