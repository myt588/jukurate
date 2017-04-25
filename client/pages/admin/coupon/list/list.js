Template.couponList.onCreated(function () {
    this.autorun(()=>{
    if (Meteor.user().isSchoolAdmin()) {
      this.subscribe('coupons.bySchool', Meteor.user().schoolId());
    } else if (Meteor.user().isWebAdmin()) {
      this.subscribe('coupons.all');
    }
  });
});

Template.couponList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    if (e.target.className == "btn btn-danger remove" || e.target.className == "fa fa-trash-o") {
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
        { key: 'title', label: 'Title' },
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