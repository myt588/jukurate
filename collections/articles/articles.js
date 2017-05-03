// Article schema definition

class ArticlesCollection extends Mongo.Collection {
	// Overwrite super class to modify our intended behaviours
 	// We will probably modify these functions later
	insert(article, callback) {
    return super.insert(article, callback);
  }

  update(selector, modifier, callback) {
    return super.update(selector, modifier, callback);
  }

	remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

Articles = new ArticlesCollection('articles');

Articles.deny({
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

ArticlesSchema = new SimpleSchema({
	// Table Data
	name: {
		type: String,
		label: 'Title'
	},
	content: {
		type: String,
	},
	tags: {
		type: [String],
		optional: true,
	},

	// Relation
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

Articles.attachSchema( ArticlesSchema );

Articles.publicFields = {
  removed_at: 0
};

Articles.helpers({
	Article(id) {
    return Articles.find({ _id: id });
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
