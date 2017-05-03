Template.dashboard.onCreated(function() {
	this.autorun(() => {
		if (Meteor.user().isSchoolAdmin()){
	    this.subscribe('schools.topItems', Meteor.user().schoolId());
		} else {
			this.subscribe('schools.topItems');
		}
  });
});

Template.dashboard.helpers({
	school() {
		return Schools.find({});
	},
	items() {
		var filter = {'sort.recommend_level': { $gt:0 }};
		var coupons = Coupons.find(filter).fetch();
    var courses = Courses.find(filter).fetch();
    var tutors = Tutors.find(filter).fetch();
    var items = coupons.concat(courses.concat(tutors));
    return _.sortBy(items, function(item) {return item.sort.recommend_level;});
	}
});