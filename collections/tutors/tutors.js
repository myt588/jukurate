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

TutorsSchema = new SimpleSchema({
	school_id: {
		type: String,
		optional: true
	},
	name: {
		type: String,
		label: 'Name'
	},
	avatar_url: {
		type: String,
		optional: true,
	},
	thumbnail: {
		type: String,
		optional: true,
	},
	description: {
		type: String,
		label: 'Description'
	},
	college: {
		type: String,
		label: 'College',
		optional: true,
	},
	college_major: {
		type: String,
		label: 'College Major',
		optional: true,
	},
	grad: {
		type: String,
		label: 'Graduate',
		optional: true,
	},
	grad_major: {
		type: String,
		label: 'Graduate Major',
		optional: true,
	},
	phd: {
		type: String,
		label: 'Doctor',
		optional: true,
	},
	phd_major: {
		type: String,
		label: 'Doctor Major',
		optional: true,
	},
	tutor_subjects: {
		type: [String],
		label: 'Tutor Subjects',
		optional: true,
	},
	rating: {
		type: Number,
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

Tutors.attachSchema( TutorsSchema );

Tutors.publicFields = {
	school_id: 1,
  name: 1,
  description: 1,
  college: 1,
	college_major: 1,
	grad: 1,
	grad_major: 1,
	phd: 1,
	phd_major: 1,
	tutor_subjects: 1,
	rating: 1,
	rating_count: 1,
	avatar_url: 1,
	thumbnail: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};
