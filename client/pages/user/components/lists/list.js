Template.regularList.onCreated(function(){
  this.collectionName = () => {
    return this.data.collection;
  }
  this.routeName = () => {
    return this.collectionName().toLowerCase().slice(0, -1) + '_detail_view';
  }
  this.autorun(() => {
    const name = 'load_more_' + this.collectionName().toLowerCase();
    const load = Session.get(name) ? Session.get(name) : this.data.initialLoad;
    const sort = Session.get('sort_by') ? Session.get('sort_by') : {};
    const subscription = this.collectionName().toLowerCase() + '.limit';
    if (this.data.filters) {
      this.subscribe(subscription, load, this.data.filters, sort);
    } else {
      this.subscribe(subscription, load, Session.get('filters'), sort);
    }
  });
});

Template.regularList.helpers({
	items() {
		return global[Template.instance().collectionName()].find({}, {
      sort: Session.get('sort_by') ? Session.get('sort_by') : {}
    });
	},
	itemData(item) {
		return {
			item_id : item._id,
      route_name : Template.instance().routeName(),
      rating : item.itemRating(),
      image_id : item.itemThumbnail(),
      title : item.itemTitle(),
      subtitle : item.itemSubtitle() ? item.itemSubtitle() : 'TBD',
      ribbon : item.itemRibbon(),
      items : item.itemArray(),
      icon_class : 'icon-book',
      item_per_line : Template.instance().data.col ? Template.instance().data.col : 3,
		}
	}
});