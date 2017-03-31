// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new class
// # PARAMS
// #   {Object}      class
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const insert = new ValidatedMethod({
  name: 'courses.insert',
  validate: null,
  run: function(cours) {
    Courses.insert(cours);
  }
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new cours
// # PARAMS
// #   {Object}      cours
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const update = new ValidatedMethod({
  name: 'courses.update',
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
  run: function(cours) {
  // 	if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to update an item!');
		// }
 		Courses.update(course.id, {
  			$set: course
			});
  	}
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new cours
// # PARAMS
// #   {Object}      cours
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const remove = new ValidatedMethod({
  name: 'courses.remove',
  validate: null,
  run: function(id) {
    console.log(id)
    Courses.update(id, {
      $set: { removed_at: new Date() }
    });
  }
});