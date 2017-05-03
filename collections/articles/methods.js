// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new article
// # PARAMS
// #   {Object}      article
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const insert = new ValidatedMethod({
  name: 'articles.insert',
  validate: null,
  run: function(article) {
    Articles.insert(article);
  }
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new article
// # PARAMS
// #   {Object}      article
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const update = new ValidatedMethod({
  name: 'articles.update',
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
  run: function(article) {
  // 	if (!this.userId) {
		//   throw new Meteor.Error('unauthorized', 'You must be logged in to update an item!');
		// }
 		Articles.update(article.id, {
  			$set: article
			});
  	}
});

// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new article
// # PARAMS
// #   {Object}      article
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const remove = new ValidatedMethod({
  name: 'articles.remove',
  validate: null,
  run: function(id) {
    console.log(id)
    Articles.update(id, {
      $set: { removed_at: new Date() }
    });
  }
});