// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new review
// # PARAMS
// #   {Object}      review
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const insert = new ValidatedMethod({
  name: 'reviews.insert',
  validate: null,
  run: function(review) {
    Reviews.insert(review);
  }
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new review
// # PARAMS
// #   {Object}      review
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const update = new ValidatedMethod({
  name: 'reviews.update',
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
  run: function(review) {
  // 	if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to update an item!');
		// }
 		Reviews.update(review.id, {
  			$set: review
			});
  	}
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new review
// # PARAMS
// #   {Object}      review
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const remove = new ValidatedMethod({
  name: 'reviews.remove',
  validate: null,
  run: function(id) {
    console.log(id)
    Reviews.update(id, {
      $set: { removed_at: new Date() }
    });
  }
});