Template.reviewList.onCreated(function () {
  this.subscribe('reviews.all');
});

Template.reviewList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    console.log(e.target.className)
    if (e.target.className == "btn btn-danger remove" || e.target.className == "fa fa-trash-o") {
      Meteor.call('reviews.remove', post._id);
    }
  }
});

Template.reviewList.helpers({
   reviews: function() {
    let reviews = Reviews.find({});
    if (reviews.count() == 0) {
      return null
    } else {
      return reviews;
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
                return new Spacebars.SafeString(adminActions('reviews', value));
            }}
          ]
      };
    },

});