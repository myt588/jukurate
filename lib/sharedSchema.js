Schema = {}

Schema.Sort = new SimpleSchema({
	rating: {
		type: Number,
		decimal:true,
	},
	rating_count: {
		type: Number,
	},
	recommend_level: {
		type: Number,
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