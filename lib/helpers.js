this.randomNumber = function(max, min) {
  if (min == null) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};


this.adminActions = function(link, id) {
	let show = `<a href='/admin/${link}/${id}' class='btn btn-info'><i class='fa fa-info-circle' aria-hidden='true'></i></a>`;
	let edit = `<a href='/admin/${link}/${id}/edit' class='btn btn-primary'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>`;
	let remove = `<a class='btn btn-danger remove'><i class='fa fa-trash-o' aria-hidden='true'></i></a>`;
	return (show + edit + remove);
}