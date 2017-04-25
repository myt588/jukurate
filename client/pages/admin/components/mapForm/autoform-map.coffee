KEY_ENTER = 13

defaults =
  mapType: 'roadmap'
  defaultLat: 35.6897412
  defaultLng: 139.7304023
  searchBox: false
  zoom: 1

AutoForm.addInputType 'map',
  template: 'afMap'
  valueOut: ->
    node = $(@context)

    lat = node.find('.js-lat').val()
    lng = node.find('.js-lng').val()
    address = node.find('.js-address').val()
    locality = node.find('.js-locality').val()
    city = node.find('.js-city').val()
    country = node.find('.js-country').val()
    postal_code = node.find('.js-postal_code').val()

    if lat?.length > 0 and lng?.length > 0
      lat: lat
      lng: lng
      address: address
      locality: locality
      city: city
      country: country
      postal_code: postal_code

Template.afMap.onCreated ->
  @mapReady = new ReactiveVar false
  GoogleMaps.load(libraries: 'places')

  @_stopInterceptValue = false
  @_interceptValue = (ctx) ->
    t = Template.instance()
    if t.mapReady.get() and ctx.value and not t._stopInterceptValue
      console.log('inside', ctx)
      location = new google.maps.LatLng parseFloat(ctx.value.lat), parseFloat(ctx.value.lng)
      t.setMarker t.map, location, t.options.zoom, ctx.value
      t.map.setCenter location
      t._stopInterceptValue = true

initTemplateAndGoogleMaps = ->
  @options = _.extend {}, defaults, @data.atts

  @data.marker = undefined
  @setMarker = (map, location, zoom=0, address={}) =>
    console.log('insideSet', address)
    @$('.js-lat').val(location.lat())
    @$('.js-lng').val(location.lng())
    @$('.js-address').val(address.address)
    @$('.js-locality').val(address.locality)
    @$('.js-city').val(address.city)
    @$('.js-country').val(address.country)
    @$('.js-postal_code').val(address.postal_code)
    @$('.show-address').text(address.address)

    if @data.marker then @data.marker.setMap null
    @data.marker = new google.maps.Marker
      position: location
      map: map

    if zoom > 0
      @map.setZoom zoom

  mapOptions =
    zoom: 0
    mapTypeId: google.maps.MapTypeId[@options.mapType]
    streetViewControl: false

  if @data.atts.googleMap
    _.extend mapOptions, @data.atts.googleMap

  @map = new google.maps.Map @find('.js-map'), mapOptions

  @map.setCenter new google.maps.LatLng @options.defaultLat, @options.defaultLng
  @map.setZoom @options.zoom

  if @data.atts.searchBox
    input = @find('.js-search')

    @map.controls[google.maps.ControlPosition.TOP_LEFT].push input
    searchBox = new google.maps.places.SearchBox input

    google.maps.event.addListener searchBox, 'places_changed', =>
      location = searchBox.getPlaces()[0].geometry.location
      place = searchBox.getPlaces()[0]
      address = {}
      address.address = place.vicinity
      for item in place.address_components
        if item.types[0] == 'locality'
          address.locality = item.long_name
        if item.types[0] == 'administrative_area_level_1'
          address.city = item.long_name
          if item.long_name != place.vicinity.slice(0,3)
            address.address = item.long_name + address.address
        if item.types[0] == 'country'
          address.country = item.long_name
        if item.types[0] == 'postal_code'
          address.postal_code = item.long_name
      @setMarker @map, location, 0, address
      @map.setCenter location

    $(input).removeClass('af-map-search-box-hidden')

  if typeof @data.atts.rendered == 'function'
    @data.atts.rendered @map

  google.maps.event.addListener @map, 'click', (e) =>
    @setMarker @map, e.latLng

  @$('.js-map').closest('form').on 'reset', =>
    @data.marker and @data.marker.setMap null
    @map.setCenter new google.maps.LatLng @options.defaultLat, @options.defaultLng
    @map.setZoom @options?.zoom or 0

  @mapReady.set true

Template.afMap.onRendered ->
  @autorun =>
    GoogleMaps.loaded() and initTemplateAndGoogleMaps.apply this

Template.afMap.helpers
  schemaKey: ->
    Template.instance()._interceptValue @
    @atts['data-schema-key']
  width: ->
    if typeof @atts.width == 'string'
      @atts.width
    else if typeof @atts.width == 'number'
      @atts.width + 'px'
    else
      '100%'
  height: ->
    if typeof @atts.height == 'string'
      @atts.height
    else if typeof @atts.height == 'number'
      @atts.height + 'px'
    else
      '200px'

Template.afMap.events
  'keydown .js-search': (e) ->
    if e.keyCode == KEY_ENTER then e.preventDefault()
