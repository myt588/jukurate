// School schema definition

class SchoolsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(school, callback) {
    return super.insert(school, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Schools = new SchoolsCollection('schools');

Schools.deny({
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

SchoolsSchema = new SimpleSchema({
	name: {
		type: String,
		label: 'Name'
	},
	description: {
		type: String,
		label: 'Description'
	},
	ribbon: {
		type: String,
		label: 'Sell Point',
		optional: true,
	},
  logo_url: {
    type: String,
    label: 'Logo',
    optional: true,
  },
	district: {
		type: String,
		label: 'District',
		optional: true,
	},
	station: {
		type: String,
		label: 'Station',
		optional: true,
	},
	walking_distance: {
		type: Number,
		label: 'Walking Distance',
		optional: true,
	},
	zipcode: {
		type: String,
		label: 'Zipcode',
		optional: true,
	},
	address: {
		type: String,
		label: 'Address',
		optional: true,
	},
	phone: {
		type: String,
		label: 'Phone',
		optional: true,
	},
	fax: {
		type: String,
		label: 'Fax',
		optional: true,
	},
	mobile: {
		type: String,
		label: 'Mobile',
		optional: true,
	},
	email: {
		type: String,
		label: 'Email',
		optional: true,
	},
	site: {
		type: String,
		label: 'Website',
		optional: true,
	},
	amenities: {
		type: [String],
		optional: true,
	},
	tags: {
    type: [String],
    optional: true,
  },
  claimed: {
    type: Boolean,
    optional: true,
  },
  top: {
		type: Boolean,
		label: 'Top',
		optional: true,
	},
	rating: {
		type: Number,
		optional: true,
		decimal:true,
		autoValue: function() {
			if (this.isInsert) {
        return 0;
      } 
		},
	},
	rating_count: {
		type: Number,
		autoValue: function() {
			if (this.isInsert) {
        return 0;
      } 
		},
	},
  created_by: {
		type: String,
		optional: true,
		autoValue: function() {
			return this.userId
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
})

Schools.attachSchema( SchoolsSchema );

Schools.publicFields = {
  name: 1,
  description: 1,
  top: 1,
	rating: 1,
	rating_count: 1,
	ribbon: 1,
  claimed: 1,
  logo_url: 1,
	image_url: 1,
	district: 1,
	station: 1,
	address: 1,
  phone: 1,
  fax: 1,
  mobile: 1,
  email: 1,
  site: 1,
  walking_distance: 1,
	zipcode: 1,
	amenities: 1,
	tags: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};

Factory.define('schools', Schools, {
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

Schools.helpers({
  isOwner: function() {
    return this.created_by === Meteor.userId();
  }
});