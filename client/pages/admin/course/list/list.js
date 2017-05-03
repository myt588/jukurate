Template.courseList.onCreated(function () {
  this.autorun(()=>{
    if (Meteor.user().isSchoolAdmin()) {
      this.subscribe('courses.bySchool', Meteor.user().schoolId());
    } else if (Meteor.user().isWebAdmin()) {
      this.subscribe('courses.all');
    }
  });
});

Template.courseList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    if (e.target.className == "btn btn-danger remove" || e.target.className == "fa fa-trash-o") {
      Meteor.call('courses.remove', post._id);
    }
  }
});

Template.courseList.helpers({
   courses: function() {
    let courses = Courses.find({});
    if (courses.count() == 0) {
      return null
    } else {
      return courses;
    }
   },
   settings : function () {
      return {
          fields: [
            { key: 'name', label: 'Title' },
            { key: 'sort.recommend_level', label: 'Recommend Level' },
            { key: 'sort.rating', label: 'Rating' },
            { key: 'sort.rating_count', label: '# of Reviews' },
            { key: 'created_at', label: 'Created Date', fn: function (value) {
                return formatDate(value);
            }},
            { key: '_id', label: 'Actions', fn: function (value) {
                return new Spacebars.SafeString(adminActions('courses', value));
            }}
          ]
      };
    },

});