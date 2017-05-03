// Tutor schema definition

class TutorsCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(tutor, callback) {
    return super.insert(tutor, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Tutors = new TutorsCollection('tutors');

Tutors.deny({
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

Schema.Edu = new SimpleSchema({
	school: {
		type: String,
	},
	major: {
		type: String,
	},
	degree: {
		type: String,
	},
	graduated: {
		type: Boolean,
	}
});

TutorsSchema = new SimpleSchema({
	// Table Data
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	edu: {
		type: [Schema.Edu],
		optional: true,
	},
	tags: {
		type: [String],
		optional: true,
	},
	
	// Relation
	school_id: {
		type: String,
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

Tutors.attachSchema( TutorsSchema );

Tutors.publicFields = {
	removed_at: 0
};

Tutors.helpers({
	collectionName(){
		return 'TUTORS';
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
  	return this.subjects;
  },
  itemSubtitle() {
  	return this.college;
  },
  itemRibbon() {
  	return 'love love love';
  }
});
