Template.topListItem.onCreated(function() {

});

Template.topListItem.helpers({
  routeName(){
    return this.collectionName().toLowerCase().slice(0, -1) + '_detail_view';
  }
});

