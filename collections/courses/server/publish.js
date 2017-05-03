const MAX_LOAD = 1000;

Meteor.publish('courses.all', function() {
	return Courses.find({
		removed_at: {$exists: false}
	},{
	  fields: Courses.publicFields
	});
});

Meteor.publish('courses.bySchool', function(schoolId) {
	return Courses.find({
		school_id: schoolId,
		removed_at: {$exists: false}
	},{
	  fields: Courses.publicFields
	});
});

Meteor.publish('courses.id', function(_id) {
	return Courses.find({
		_id: _id 
	},{
	  fields: Courses.publicFields
	});
});

Meteor.publish('courses.limit', function(limit, filters, sort) {
  const options = {
  	sort: sort ? sort : {'sort.recommend_level' : -1}, 
  	limit: Math.min(limit ? limit : 8, MAX_LOAD),
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Courses.find(filtersCopy, options, { fields: Courses.publicFields });
});