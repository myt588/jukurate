Template.tutorList.onCreated(function () {
  this.subscribe('tutors.all');
});

Template.tutorList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    console.log(e.target.className)
    if (e.target.className == "btn btn-danger remove" | "fa fa-trash-o") {
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
            { key: 'description', label: 'Discription' },
            { key: 'created_at', label: 'Created Date' },
            { key: '_id', label: 'Actions', 
              fn: function (value) {
                return new Spacebars.SafeString(adminActions('tutors', value));
            }}
          ]
      };
    },

});