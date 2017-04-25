Template.reviewShow.onCreated(function() {
  this.autorun(() => {
    this.subscribe('reviews.id', {_id: Router.current().params.id});
    if (this.subscriptionsReady()) {
			notAuthorized()
		}
  });
})