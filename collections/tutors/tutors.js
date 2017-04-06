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
	name: {
		type: String,
		label: 'Name'
	},
	avatar_url: {
		type: String,
		label: 'Profile Photo',
		optional: true,
	},
	description: {
		type: String,
		label: 'Description'
	},
	graduated_school: {
		type: String,
		label: 'Graduated School',
		optional: true,
	},
	current_school: {
		type: String,
		label: 'Current School',
		optional: true,
	},
	tutor_subjects: {
		type: [String],
		label: 'Tutor Subjects',
		optional: true,
	},
	overall: {
		type: Number,
		decimal:true,
		autoform: {
			type: 'hidden'
		}
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

Tutors.attachSchema( TutorsSchema );

Tutors.publicFields = {
  name: 1,
  description: 1,
  graduated_school: 1,
	current_school: 1,
	tutor_subjects: 1,
	overall: 1,
	avatar_url: 1,
  created_by: 1,
  created_at: 1,
  updated_at: 1
};
