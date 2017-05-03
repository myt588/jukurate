Template.tagList.onCreated(function () {
  this.autorun(()=>{
    this.subscribe('tags.all');
  });
});

Template.tagList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    if (e.target.className == "btn btn-danger remove" || e.target.className == "fa fa-trash-o") {
      Meteor.call('tags.remove', post._id);
    }
  }
});

Template.tagList.helpers({
  tags: function() {
    let tags = Tags.find({});
    if (tags.count() == 0) {
      return null
    } else {
      return tags;
    }
  },
  settings : function () {
    return {
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'created_at', label: 'Created Date' },
        { key: '_id', label: 'Actions', 
          fn: function (value) {
            return new Spacebars.SafeString(adminActions('tags', value));
        }}
      ]
    };
  },
});