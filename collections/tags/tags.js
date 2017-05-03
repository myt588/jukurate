// Tag schema definition

class TagsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(tag, callback) {
    return super.insert(tag, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Tags = new TagsCollection('tags');

Tags.deny({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

TagsSchema = new SimpleSchema({
	name: {
		type: String,
	},
	type: {
		type: String,
	},
	description: {
		type: String,
		optional: true,
	},
	recommend_level: {
		type: Number,
		optional: true,
		autoValue: function() {
			return 0
		},
	},
	created_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
	},
	updated_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
	},
	removed_at: {
		type: Date,
		optional: true,
	}
});

Tags.attachSchema( TagsSchema );

Tags.publicFields = {
	name: 1,
	type: 1,
  description: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};

Tags.helpers({

});