Template.schoolList.onCreated(function () {
  this.subscribe('schools.all');
});

Template.schoolList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    console.log(e.target.className)
    if (e.target.className == "btn btn-danger remove" | "fa fa-trash-o") {
      Meteor.call('schools.remove', post._id);
    }
  }
});

Template.schoolList.helpers({
   schools: function() {
    let schools = Schools.find({});
    if (schools.count() == 0) {
      return null
    } else {
      return schools;
    }
   },
   settings : function () {
      return {
          fields: [
            { key: 'name', label: 'Name' },
            { key: 'top', label: 'Top' },
            { key: 'created_at', label: 'Created Date' },
            { key: '_id', label: 'Actions', 
              fn: function (value) {
                return new Spacebars.SafeString(adminActions('schools', value));
            }}
          ]
      };
    },

});