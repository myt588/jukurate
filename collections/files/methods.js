// # !!!
// #   MUST BE A LOGGED IN USER TO CALL THIS METHOD
// # DESC
// #   create a new class
// # PARAMS
// #   {Object}      class
// #     {String}    name
// #     {String}    description -> optional
// #     {bool}      checked -> optional
// #

const insert = new ValidatedMethod({
  name: 'images.insert',
  validate: null,
  run: function(file) {
    Images.insert({
    	file: file,
    	isBase64: true,
      fileName: 'pic.png',
      streams: 'dynamic',
      chunkSize: 'dynamic'
  	});
  }
});