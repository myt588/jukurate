Meteor.publish('coupons.all', function() {
	return Coupons.find({
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

