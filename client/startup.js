import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // render(<HelloWorld />, document.getElementById('app'));
  GoogleMaps.load({
  	key: 'AIzaSyDMWIXR9xuCMyN_C6rRVaPvRGcEB6GDgkA', 
  	libraries: 'geometry,places', 
  	language: 'ja',
  	region: 'JP'
  });

});