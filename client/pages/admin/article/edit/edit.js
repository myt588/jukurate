Template.articleEdit.onCreated(function() {
  this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('articles.id', this.getId());
  });
});

Template.articleEdit.helpers({
  article: function() {
   	return Articles.findOne({_id: Router.current().params.id});
  }
});