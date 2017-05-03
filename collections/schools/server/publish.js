const MAX_LOAD = 30;

Meteor.publish('schools.all', function() {
	return Schools.find({
		removed_at: {$exists: false}
	},{
	  fields: Schools.publicFields
	});
});

Meteor.publish('schools.nameList', function() {
	return Schools.find({
		removed_at: {$exists: false}
	},{
	  fields: {name: 1}
	});
});

Meteor.publish('schools.limit', function(limit, filters, sort) {
	const options = {
  	sort: sort ? sort : {'sort.recommend_level' : -1}, 
  	limit: Math.min(limit ? limit : 4, MAX_LOAD)
	};
	const filtersCopy = filters ? filters : {};
	filtersCopy.removed_at = {$exists: false};
	return Schools.find(filtersCopy, options, { fields: Schools.publicFields });
});

Meteor.publish('schools.id', function(_id) {
	return Schools.find({
		_id: _id 
	},{
	  fields: Schools.publicFields
	});
});

Meteor.publishComposite('schools.topItems', function(id) {
	return {
		find() {

			let filter = id ? {_id: id} : {'sort.recommend_level': { $gt:0 }};
	    // Find top ten highest scoring schools
	    return Schools.find(filter, { fields: Schools.publicFields });
	  },
	  children: [
	    {
	      find(school) {
	        return Tutors.find({ 
	        	school_id: school._id,
	        	'sort.recommend_level': { $gt:0 }
	        }, {
	        	fields: Tutors.publicFields
	        });
	      }
	    },
	    {
	      find(school) {
	        return Coupons.find({ 
	        	school_id: school._id,
	        	'sort.recommend_level': { $gt:0 }
	        }, {
	        	fields: Coupons.publicFields
	        });
	      }
	    },
	    {
	      find(school) {
	        return Courses.find({ 
	        	school_id: school._id,
	        	'sort.recommend_level': { $gt:0 }
	        }, {
	        	fields: Courses.publicFields
	        });
	      }
	    }
	  ]
	}
});

