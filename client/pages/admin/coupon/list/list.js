Template.couponList.onCreated(function () {
  this.subscribe('coupons.all');
});

Template.couponList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    console.log(e.target.className)
    if (e.target.className == "btn btn-danger remove" | "fa fa-trash-o") {
      Meteor.call('coupons.remove', post._id);
    }
  }
});

Template.couponList.helpers({
  coupons: function() {
    let coupons = Coupons.find({});
    if (coupons.count() == 0) {
      return null
    } else {
      return coupons;
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
            return new Spacebars.SafeString(adminActions('coupons', value));
        }}
      ]
    };
  },

});