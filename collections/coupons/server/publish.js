const MAX_LOAD = 1000;

Meteor.publish('coupons.all', function() {
	return Coupons.find({
		removed_at: {$exists: false}
	},{
	  fields: Coupons.publicFields
	});
});

Meteor.publish('coupons.bySchool', function(schoolId) {
	return Coupons.find({
		school_id: schoolId,
		removed_at: {$exists: false}
	},{
	  fields: Coupons.publicFields
	});
});

Meteor.publish('coupons.id', function(_id) {
	return Coupons.find({
		_id: _id
	},{
	  fields: Coupons.publicFields
	});
});

Meteor.publish('coupons.limit', function(limit, filters, sort) {
  const options = {
  	sort: sort ? sort : {recommend_level : -1}, 
  	limit: Math.min(limit ? limit : 8, MAX_LOAD),
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
  return Coupons.find(filtersCopy, options, { fields: Coupons.publicFields });
});