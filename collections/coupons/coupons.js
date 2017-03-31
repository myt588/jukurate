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

this.Coupons = new CouponsCollection('coupons');

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
	name: {
		type: String,
		label: 'Name'
	},
	description: {
		type: String,
		label: 'Description'
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
  name: 1,
  description: 1,
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