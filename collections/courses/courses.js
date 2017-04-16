// course schema definition

class CoursesCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(course, callback) {
    return super.insert(course, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Courses = new CoursesCollection('courses');

Courses.deny({
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

CoursesSchema = new SimpleSchema({
	school_id: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden'
		}
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
	title: {
		type: String,
		label: 'Title'
	},
	description: {
		type: String,
		label: 'Description'
	},
	subject: {
		type: String,
		label: 'Subjects',
		optional: true,
	},
	price: {
		type: Number,
		decimal:true,
	},
	tags: {
		type: [String],
		label: 'Tags',
		optional: true
	},
	taught_by: {
		type: [String],
		label: 'Taught By',
		optional: true
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

	// Timestamps
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

Courses.attachSchema( CoursesSchema );

Courses.publicFields = {
	school_id: 1,
	rating: 1,
	rating_count: 1,
  title: 1,
  description: 1,
  subject: 1,
  cover_image: 1,
  price: 1,
  tags: 1,
  taught_by: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};

Factory.define('courses', Courses, {
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