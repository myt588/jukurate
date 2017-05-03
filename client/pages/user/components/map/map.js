Template.map.onCreated(function(){
	GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.map.onRendered(function(){

});

Template.map.helpers({
  mapOptions: function() {
  	const lat = Template.instance().data.lat ? Template.instance().data.lat : LAT;
  	const lng = Template.instance().data.lng ? Template.instance().data.lng : LNG;
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(lat, lng),
        zoom: 17
      };
    }
  }
});