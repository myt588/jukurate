Template.topList.onCreated(function() {
	this.subscribe('schools.topItems');
});

Template.topList.helpers({
	items() {
		var filter = {'sort.recommend_level': { $gt:0 }};
		var schools = Schools.find(filter).fetch();
		var coupons = Coupons.find(filter).fetch();
    var courses = Courses.find(filter).fetch();
    var tutors = Tutors.find(filter).fetch();
    var items = coupons.concat(courses.concat(tutors.concat(schools)));
    return _.sortBy(items, function(item) {return item.sort.recommend_level;});
	}
});