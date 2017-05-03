Template.reviewComposeView.onCreated(function(){
  this.autorun(() => {
  	let subscription = Router.current().params.type + '.id';
    this.subscribe(subscription, Router.current().params.id);
  });
});

Template.reviewComposeView.helpers({
	_id() {
		return Router.current().params.id;
	},
	review_item() {
		let type = Router.current().params.type;
		type = type[0].toUpperCase() + type.slice(1);
		let id = Router.current().params.id;
		return global[type].findOne({_id: id});
	},
	review_attributes() {
		let type = Router.current().params.type;
		let id = Router.current().params.id;
		return REVIEW_TYPE[type.toUpperCase()];
	}
});