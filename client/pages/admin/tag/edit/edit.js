Template.tagEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('tags.id', this.getId());
    if (this.subscriptionsReady()) {
      notAuthorized()
    }
  });
});

AutoForm.hooks({
  updateTagForm: {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      // You must call this.done()!
      this.event.preventDefault();
      insertDoc.id = Router.current().params.id
      Meteor.call('tags.update', insertDoc);
      this.done();
      Router.go('tag_list');
      //this.done(); // submitted successfully, call onSuccess
      //this.done(new Error('foo')); // failed to submit, call onError with the provided error
      //this.done(null, "foo"); // submitted successfully, call onSuccess with `result` arg set to "foo"
    },
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {},

    // Called when any submit operation fails
    onError: function(formType, error) {},
  }
});

Template.tagEdit.helpers({
  tag: function() {
   	return Tags.findOne({_id: Router.current().params.id});
  }
});