Template.tutorDetailView.onCreated(function(){
	this.getId = () => Router.current().params.id;
  this.autorun(() => {
    this.subscribe('tutors.id', this.getId());
    this.state = new ReactiveDict();
		this.state.set('tutor', Tutors.findOne({_id: this.getId()}));
  });

});

Template.tutorDetailView.helpers({
	tutor() {
   	return Template.instance().state.get('tutor');
  },
  _edus() {
		const tutor = Template.instance().state.get('tutor');
		let edus = [];
		if (tutor.college) {
			edus.push({'school': tutor.college, 'major': tutor.college_major});
		}
		if (tutor.grad) {
			edus.push({'school': tutor.grad, 'major': tutor.grad_major});
		}
		if (tutor.phd) {
			edus.push({'school': tutor.phd, 'major': tutor.phd_major});
		}
		console.log(edus)
		return edus;
  }
});

