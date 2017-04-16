Template.reviewMood.helpers({
  mood(rating = Template.instance().data.rating) {
    rating = Math.round(rating);
    const dict = {
      1 : 'icon-mad',
      2 : 'icon-wondering',
      3 : 'icon-neutral',
      4 : 'icon-smile',
      5 : 'icon-happy'
    };
    return dict[rating];
  }
});

Template.reviewStars.helpers({
  stars(rating = Template.instance().data.rating) {
    let star = '';
    rating = Math.round(rating);
    for (var i = rating; i > 0; i--) {
      star += '<i class="fa fa-star"></i>';
    }
    for (var i = 5 - rating; i > 0; i--) {
      star += '<i class="fa fa-star-o"></i>';
    }
    return star;
  },
});

Template.reviewLabel.helpers({
  ratingLabel(rating = Template.instance().data.rating) {
    rating = Math.round(rating);
    const dict = {
      0 : 'worst',
      1 : 'Bad',
      2 : 'Not Good',
      3 : 'Average',
      4 : 'Good',
      5 : 'Excellent'
    };
    return dict[rating];
  },
})



