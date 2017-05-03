// Support schema definition

class SupportsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(support, callback) {
    return super.insert(support, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Supports = new SupportsCollection('supports');

Supports.deny({
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

SupportsSchema = new SimpleSchema({
	// Table Data
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
		optional: true,
	},
	message: {
		type: String,
	},

	// Timestamps
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
})

Supports.attachSchema( SupportsSchema );

Supports.publicFields = {
	removed_at: 0
};

