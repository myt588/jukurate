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
	// Table Data
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	subject: {
		type: [String],
		optional: true,
	},
	price: {
		type: Number,
		decimal:true,
	},
	tags: {
		type: [String],
		optional: true
	},

	// Relation
	school_id: {
		type: String,
		optional: true,
	},
	tutor_id: {
		type: [String],
		label: 'Taught By',
		optional: true
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

Courses.attachSchema( CoursesSchema );

Courses.publicFields = {
	removed_at: 0
};

Courses.helpers({
	collectionName(){
		return 'COURSES';
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
  	return [this.subject];
  },
  itemSubtitle() {
  	return this.description;
  },
  itemRibbon() {
  	return 'love love love';
  }
});
