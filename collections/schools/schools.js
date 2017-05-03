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

Schema.BusinessHour = new SimpleSchema({
	monday: {
    type: [String],
    optional: true,
  },
  tuesday: {
    type: [String],
    optional: true,
  },
  wednesday: {
    type: [String],
    optional: true,
  },
  thursday: {
    type: [String],
    optional: true,
  },
  friday: {
    type: [String],
    optional: true,
  },
  saturday: {
    type: [String],
    optional: true,
  },
  sunday: {
    type: [String],
    optional: true,
  },
  formatted: {
  	type: [String],
  }
});

Schema.Location = new SimpleSchema({
  lat: {
    type: String,
    optional: true,
  },
  lng: {
    type: String,
    optional: true,
  },
  address: {
		type: String,
		optional: true,
	},
	locality: {
		type: String,
		optional: true,
	},
	city: {
		type: String,
		optional: true,
	},
	country: {
		type: String,
		optional: true,
	},
	postal_code: {
		type: String,
		optional: true,
	}
});

Schema.Station = new SimpleSchema({
	name: {
		type: String,
		optional: true,
	},
	distance: {
		type: Number,
		optional: true,
	},
});

Schema.Contact = new SimpleSchema({
	phone: {
		type: String,
		optional: true,
	},
	fax: {
		type: String,
		optional: true,
	},
	mobile: {
		type: String,
		optional: true,
	},
	email: {
		type: String,
		optional: true,
	},
	site: {
		type: String,
		label: 'Website',
		optional: true,
	},
});

Schema.School = new SimpleSchema({
	// Table Data
	name: {
		type: String,
		label: 'Name'
	},
	description: {
		type: String,
		label: 'Description'
	},
	founded_on: {
		type: Date,
		optional: true,
	},
	ribbon: {
		type: String,
		label: 'Slogan',
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
  hours: {
    type: Schema.BusinessHour,
    optional: true,
  },

	// Shared
  thumbnail: {
    type: Schema.Thumbnail,
    optional: true,
  },
	station: {
		type: [Schema.Station],
		optional: true,
	},
	location: {
    type: Schema.Location,
    optional: true,
    blackbox: true
  },
	contact: {
		type: Schema.Contact,
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
});

Schools.attachSchema( Schema.School );

Schools.publicFields = {
	removed_at: 0
};

Schools.helpers({
	collectionName(){
		return 'SCHOOLS';
	},
	phone() {
		return this.contact.phone;
	},
	mobile() {
		return this.contact.mobile;
	},
	fax() {
		return this.contact.fax;
	},
	email() {
		return this.contact.email;
	},
	site() {
		return this.contact.site;
	},
	address() {
		return this.location.address;
	},
	rating() {
		return this.sort.rating;
	},
	ratingCount() {
		return this.sort.rating_count;
	},
  itemTitle() {
    return this.name;
  },
  itemThumbnail() {
    return this.thumbnail ? this.thumbnail.cropped : false;
  },
  itemRating() {
  	return this.sort.rating;
  },
  itemArray() {
  	return this.tags;
  },
  itemSubtitle() {
  	return this.location ? this.location.address : '';
  },
  itemRibbon() {
  	return this.ribbon;
  }
});

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