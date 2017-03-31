// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new tutor
// # PARAMS
// #   {Object}      tutor
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const insert = new ValidatedMethod({
  name: 'tutors.insert',
  validate: null,
  run: function(tutor) {
    Tutors.insert(tutor);
  }
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new tutor
// # PARAMS
// #   {Object}      tutor
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const update = new ValidatedMethod({
  name: 'tutors.update',
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
  run: function(tutor) {
  // 	if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to update an item!');
		// }
 		Tutors.update(tutor.id, {
  			$set: tutor
			});
  	}
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new tutor
// # PARAMS
// #   {Object}      tutor
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const remove = new ValidatedMethod({
  name: 'tutors.remove',
  validate: null,
  run: function(id) {
    console.log(id)
    Tutors.update(id, {
      $set: { removed_at: new Date() }
    });
  }
});