const MAX_LOAD = 1000;

Meteor.publish('tutors.all', function() {
	return Tutors.find({
		removed_at: {$exists: false}
	},{
	  fields: Tutors.publicFields
	});
});

Meteor.publish('tutors.bySchool', function(schoolId) {
	return Tutors.find({
		school_id: schoolId,
		removed_at: {$exists: false}
	},{
	  fields: Tutors.publicFields
	});
});

Meteor.publish('tutors.id', function(_id) {
	return Tutors.find({
		_id: _id 
	},{
	  fields: Tutors.publicFields
	});
});

Meteor.publish('tutors.limit', function(limit, filters, sort) {
  const options = {
  	sort: sort ? sort : {'sort.recommend_level' : -1}, 
  	limit: Math.min(limit ? limit : 8, MAX_LOAD),
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Tutors.find(filtersCopy, options, { fields: Tutors.publicFields });
});