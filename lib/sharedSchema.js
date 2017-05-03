Schema = {}

Schema.Sort = new SimpleSchema({
	rating: {
		type: Number,
		decimal:true,
		optional: true,
	},
	rating_count: {
		type: Number,
		optional: true,
	},
	recommend_level: {
		type: Number,
		optional: true,
	},
	likes: {
		type: Number,
		optional: true,
	}
});

Schema.Thumbnail = new SimpleSchema({
	original: {
		type: String,
	},
	cropped: {
		type: String,
	},
});