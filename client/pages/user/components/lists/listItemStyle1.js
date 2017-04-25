Template.listItemStyle1.helpers({
  image_class(a) {
    return a ? a : 'center-block';
  },
  itemPerLine(a) {
  	return a ? "col-sm-" + a : "col-sm-3";
  }
  // image_height(a) {
  //   return a ? a : 300;
  // },
  // image_width(a) {
  //   return a ? a : 300;
  // }
})