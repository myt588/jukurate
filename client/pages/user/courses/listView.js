Template.tutorListView.events({
	"click #more_courses"(e) {
		const load = Session.get('load_more_courses');
		Session.set('load_more_courses', (load ? load : 8) + 8)
	}
});