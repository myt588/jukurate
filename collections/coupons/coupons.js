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
	school_id: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden'
		}
	},
	course_ids: {
		type: [String],
		label: 'Course Package',
		optional: true,
	},
	rating: {
		type: Number,
		decimal:true,
		autoform: {
			type: 'hidden'
		},
		autoValue: function() {
			if (this.isInsert) {
        return 0;
      }
		},
	},
	rating_count: {
		type: Number,
		autoform: {
			type: 'hidden'
		},
		autoValue: function() {
			if (this.isInsert) {
        return 0;
      }
		},
	},
	cover_image: {
		type: String,
		optional: true,
		autoform: {
			afFieldInput: {
	      type: 'fileUpload',
	      collection: 'Images',
	      accept: 'image/*',
	      label: 'Choose file'
	    }
		}
	},
	thumbnail: {
		type: String,
		optional: true,
	},
	title: {
		type: String,
		label: 'Title'
	},
	description: {
		type: String,
		label: 'Description'
	},
	price: {
		type: Number,
		decimal:true,
	},
	tags: {
		type: [String],
		label: 'Tutor Subjects',
		optional: true,
		autoform: {
      type: "selectize",
      multiple: true,
      options: function () {
        return _.map(TAGS || [], function (item) {
		      return {label: item, value: item};
		    });
      },
      selectizeOptions: {
        hideSelected: true,
        plugins: {
          "remove_button": {}
        }
      }
    }
	},
	created_by: {
		type: String,
		optional: true,
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

Coupons.attachSchema( CouponsSchema );

Coupons.publicFields = {
  school_id: 1,
  course_ids: 1,
	rating: 1,
	rating_count: 1,
  title: 1,
  description: 1,
  cover_image: 1,
  price: 1,
  tags: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};

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

Coupons.helpers({
	coupon(id) {
    return Coupons.find({ _id: id });
  }
})