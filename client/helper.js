// Helpers

Template.registerHelper('and',(a,b)=>{
  return a && b;
});

Template.registerHelper('or',(a,b)=>{
  return a || b;
});

Template.registerHelper("log", function(something) {
  console.log('view:', something);
});

Template.registerHelper('roundToOne',(num)=>{
	if (num == null) {
		return;
	}
  return (Math.round( num * 10 ) / 10).toFixed(1);
});


Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}