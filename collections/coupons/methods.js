// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new coupon
// # PARAMS
// #   {Object}      coupon
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const insert = new ValidatedMethod({
  name: 'coupons.insert',
  validate: null,
  run: function(coupon) {
    Coupons.insert(coupon);
  }
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new coupon
// # PARAMS
// #   {Object}      coupon
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const update = new ValidatedMethod({
  name: 'coupons.update',
  validate: null,
  // validate: new SimpleSchema({
  //   name: { 
  //   	type: String 
  //   },
  //   description: { 
  //   	type: String,
  //   	optional: true
  //   },
  //   created_by: {
  //   	type: String,
  //   	optional: true
  //   },
  //   created_at: {
  //   	type: Date,
  //   	optional: true
  //   },
  //   updated_at: {
  //   	type: Date,
  //   	optional: true
  //   },
  // }).validator(),
  run: function(coupon) {
  // 	if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to update an item!');
		// }
 		Coupons.update(coupon.id, {
  			$set: coupon
			});
  	}
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new coupon
// # PARAMS
// #   {Object}      coupon
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const remove = new ValidatedMethod({
  name: 'coupons.remove',
  validate: null,
  run: function(id) {
    console.log(id)
    Coupons.update(id, {
      $set: { removed_at: new Date() }
    });
  }
});