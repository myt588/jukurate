Template.tutorList.onCreated(function () {
  this.autorun(()=>{
    if (Meteor.user().isSchoolAdmin()) {
      this.subscribe('tutors.bySchool', Meteor.user().schoolId());
    } else if (Meteor.user().isWebAdmin()) {
      this.subscribe('tutors.all');
    }
  });
});

Template.tutorList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    if (e.target.className == "btn btn-danger remove" || e.target.className == "fa fa-trash-o") {
      Meteor.call('tutors.remove', post._id);
    }
  }
});

Template.tutorList.helpers({
   tutors: function() {
    let tutors = Tutors.find({});
    if (tutors.count() == 0) {
      return null
    } else {
      return tutors;
    }
   },
   settings : function () {
      return {
          fields: [
            { key: 'name', label: 'Name' },
            { key: 'sort.recommend_level', label: 'Recommend Level' },
            { key: 'sort.rating', label: 'Rating' },
            { key: 'sort.rating_count', label: '# of Reviews' },
            { key: 'created_at', label: 'Created Date', fn: function (value) {
                return formatDate(value);
            }},
            { key: '_id', label: 'Actions', fn: function (value) {
                return new Spacebars.SafeString(adminActions('tutors', value));
            }}
          ]
      };
    },

});