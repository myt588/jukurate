T9n.setLanguage("zh_CN");

this.randomNumber = function(max, min) {
  if (min == null) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};


this.adminActions = function(link, id) {
  let assign = ``;
  if (link == 'schools') {
    assign = `<a href='/admin/${link}/${id}/assign' class='btn btn-info'><i class='fa fa-angle-double-right' aria-hidden='true'></i></a>`;
  }
	let show = `<a href='/admin/${link}/${id}' class='btn btn-info'><i class='fa fa-info-circle' aria-hidden='true'></i></a>`;
	let edit = `<a href='/admin/${link}/${id}/edit' class='btn btn-primary'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></a>`;
	let remove = `<a class='btn btn-danger remove'><i class='fa fa-trash-o' aria-hidden='true'></i></a>`;
	return (assign + show + edit + remove);
}

this.resetSessions = function() {
	Object.keys(Session.keys).forEach(function(key){ Session.set(key, undefined); })
	Session.keys = {}
}

this.textAreaSettings = function() {
	return {
		height: 200,
    disableDragAndDrop: true,
		placeholder: 'Start writing your description...',
    toolbar: [
	    ['style', ['bold', 'italic', 'underline', 'clear']],
	    ['para', ['ul', 'ol', 'paragraph']],
	    ['misc', ['fullscreen', 'codeview', 'undo', 'redo']]
	  ],
    callbacks: {
      onKeydown: function (e) { 
        var t = e.currentTarget.innerText; 
        if (t.trim().length >= DESCPTION_LENGTH) {
            //delete key
            if (e.keyCode != 8)
            e.preventDefault(); 
        } 
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('#word_max').text(DESCPTION_LENGTH - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var all = t + bufferText;
        document.execCommand('insertText', false, bufferText.trim().substring(0, DESCPTION_LENGTH - t.trim().length));
        $('#word_max').text(DESCPTION_LENGTH - t.trim().length);
      }
    }
  }
}

this.selectizeOptions = function() {
	return {
		hideSelected: true,
    plugins: {
      "remove_button": {}
    }
  }
}

this.notAuthorized = function() {
	if (!Meteor.userId()) {
    console.log("not logged in", Meteor.userId())
    Router.go('dashboard');
  } else if ( Meteor.user().hasOwnProperty('roles') && !Roles.userIsInRole(Meteor.user(), ['admin'], Roles.GLOBAL_GROUP)) {
    console.log("user not admin", Meteor.userId())
    Router.go('dashboard');
  }
}

this.formatDate = function(value) {
  return moment(value).format("dddd, YYYY/MM/DD, h:mm a")
}

this.capitalizeFirstLetter = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
