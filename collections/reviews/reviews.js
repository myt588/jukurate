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
	owner_type: {
		type: String,
	},
	owner_id: {
		type: String,
	},
	description: {
		type: String,
	},
	overall: {
		type: Number,
		decimal:true,
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
	created_by: {
		type: String,
		autoValue: function() {
			return this.userId
		},
		autoform: {
			type: 'hidden'
		}
	},
	created_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: 'hidden'
		}
	},
	updated_at: {
		type: Date,
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: 'hidden'
		}
	},
	removed_at: {
		type: Date,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	}
})

Reviews.attachSchema( ReviewsSchema );

Reviews.publicFields = {
	owner_id: 1,
	owner_type: 1,
  description: 1,
  overall: 1,
  location: 1,
  environment: 1,
  price: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};


