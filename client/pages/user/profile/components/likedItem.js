Template.likedItem.onCreated(function() {
	this.collectionName = () => {
    return this.data.collection;
  }
  this.routeName = () => {
    return this.collectionName().toLowerCase().slice(0, -1) + '_detail_view';
  }
  this.autorun(() => {
    const subscription = this.collectionName().toLowerCase() + '.id';
    this.subscribe(subscription, this.data.id);
  });
});

Template.likedItem.helpers({
	item() {
		return global[Template.instance().collectionName()].findOne();
	},
	collectionName() {
		return Template.instance().collectionName().toUpperCase();
	},
  routeName(){
    return Template.instance().collectionName().toLowerCase().slice(0, -1) + '_detail_view';
  }
});

