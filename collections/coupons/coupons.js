// Coupon schema definition

class CouponsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(coupon, callback) {
    return super.insert(coupon, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Coupons = new CouponsCollection('coupons');

Coupons.deny({
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

CouponsSchema = new SimpleSchema({
	// Table Data
	name: {
		type: String,
		label: 'Title'
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		decimal:true,
	},
	tags: {
		type: [String],
		optional: true,
	},

	// Relation
	school_id: {
		type: String,
		optional: true,
	},
	course_ids: {
		type: [String],
		optional: true,
	},
	created_by: {
		type: String,
		optional: true,
		autoValue: function() {
			return this.userId
		},
	},

	// Shared 
	thumbnail: {
    type: Schema.Thumbnail,
    optional: true,
  },
	sort: {
		type: Schema.Sort,
		autoValue: function() {
			if (this.isInsert) {
        return {
        	rating: 0,
					rating_count: 0,
					recommend_level: 0,
					likes: 0
				};
      } 
		},
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

Coupons.attachSchema( CouponsSchema );

Coupons.publicFields = {
  removed_at: 0
};

Coupons.helpers({
	collectionName(){
		return 'COUPONS';
	},
	coupon(id) {
    return Coupons.find({ _id: id });
  },
  itemTitle() {
    return this.name;
  },
  itemThumbnail() {
    return this.thumbnail;
  },
  itemRating() {
  	return this.sort.rating;
  },
  itemArray() {
  	return this.tags;
  },
  itemSubtitle() {
  	return this.description;
  },
  itemRibbon() {
  	return 'love love love';
  }
});

Factory.define('coupons', Coupons, {
  name: function() {
    return faker.lorem.words(3).join(' ');
  },
  description: function() {
  	return faker.lorem.sentences(3,3);
  },
  created_by: function () {
  	return this.userId;
  },
  created_at: function () {
  	return faker.date.past();
  },
  updated_at: function () {
  	return faker.date.past();
  }
});