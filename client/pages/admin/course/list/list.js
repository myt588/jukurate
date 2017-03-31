Template.courseList.onCreated(function () {
  this.subscribe('courses.all');
});

Template.courseList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    console.log(e.target.className)
    if (e.target.className == "btn btn-danger remove" | "fa fa-trash-o") {
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
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Discription' },
            { key: 'created_at', label: 'Created Date' },
            { key: '_id', label: 'Actions', 
              fn: function (value) {
                return new Spacebars.SafeString(adminActions('courses', value));
            }}
          ]
      };
    },

});