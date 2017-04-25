AutoForm.addInputType('businessHour', {
  template: 'hours',
  valueOut: function() {
    node = $(this.context);
    let original = node.find('.fu-original').val();
    let cropped = node.find('.fu-cropped').val();
    return {
      original: original,
      cropped: cropped,
    };
  }
});