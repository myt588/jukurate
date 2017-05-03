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
  name: 'supports.insert',
  validate: null,
  run: function(support) {
    Supports.insert(support);
  }
});