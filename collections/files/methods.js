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

const uploadSingle = new ValidatedMethod({
  name: 'files.singleUp',
  validate: null,
  run: function(file) {
    Files.insert({
    	file: file,
    	isBase64: true,
      fileName: 'pic.png',
      streams: 'dynamic',
      chunkSize: 'dynamic'
  	});
  }
});

const uploadMultiple = new ValidatedMethod({
  name: 'files.multiUp',
  validate: null,
  run: function(files) {
    let ids = [];
    for (i in files) {
      var id = Files.insert({
        file: files[i],
        name: files[i].name,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      });
      ids.push(id);
    }
    return ids;
  }
});

