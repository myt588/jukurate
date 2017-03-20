const factory = new ValidatedMethod({
  name: 'factory',
  validate: null,
  run: function() {
    return _.times(randomNumber(50, 30), function() {
      return Factory.create('schools');
    });
  }
});