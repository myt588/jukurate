// Review schema definition

class ReviewsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(review, callback) {
    return super.insert(review, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Reviews = new ReviewsCollection('reviews');

Reviews.deny({
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

ReviewsSchema = new SimpleSchema({
	// Table Data
	description: {
		type: String,
	},
	overall: {
		type: Number,
		decimal: true
	},
	location: {
		type: Number,
	},
	environment: {
		type: Number,
	},
	price: {
		type: Number,
	},

	// Relation
	owner_type: {
		type: String,
	},
	owner_id: {
		type: String,
	},
	school_id: {
		type: String,
	},
	created_by: {
		type: String,
		autoValue: function() {
			return this.userId
		}
	},

	// Timestamps
	created_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		}
	},
	updated_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		}
	},
	removed_at: {
		type: Date,
		optional: true,
	}
})

Reviews.attachSchema( ReviewsSchema );

Reviews.publicFields = {
	removed_at: 0
};


