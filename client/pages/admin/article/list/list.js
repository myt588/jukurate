Template.articleList.onCreated(function () {
  this.autorun(()=>{
    this.subscribe('articles.all');
  });
});

Template.articleList.events({
  'click .reactive-table tbody tr'(e) {
    let post = this;
    if (e.target.className == "btn btn-danger remove" || e.target.className == "fa fa-trash-o") {
      Meteor.call('articles.remove', post._id);
    }
  }
});

Template.articleList.helpers({
  articles: function() {
    let articles = Articles.find({});
    if (articles.count() == 0) {
      return null
    } else {
      return articles;
    }
  },
  settings : function () {
    return {
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'sort.recommend_level', label: 'Recommend Level' },
        { key: 'sort.rating', label: 'Rating' },
        { key: 'sort.rating_count', label: '# of Reviews' },
        { key: 'created_at', label: 'Created Date', fn: function (value) {
            return formatDate(value);
        }},
        { key: '_id', label: 'Actions', fn: function (value) {
            return new Spacebars.SafeString(adminActions('articles', value));
        }}
      ]
    };
  },

});