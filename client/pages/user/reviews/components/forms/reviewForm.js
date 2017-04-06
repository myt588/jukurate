Template.reviewForm.onCreated(function(){
  this.state = new ReactiveDict();
  this.state.setDefault({
    description: '',
    overall: 0
  });
});

Template.reviewForm.events({
  "keyup #review-description"(e, instance) {
    e.preventDefault();
    instance.state.set(e.target.name, e.target.value);
  },

  "click .star-rating"(e, instance) {
    let targetId = e.target.id.slice(0, -1);
    let attributes = instance.data.attributes;
    for (item in attributes) {
      if (targetId == (attributes[item] + '_star')) {
        instance.state.set(e.target.name, parseInt(e.target.value));
        let overall = calculateOverall(instance);
        instance.state.set('overall', overall);
      }
    }
  },

  "submit #review-form"(e, instance) {
    e.preventDefault();
    let data = instance.state.all();
    data['owner_type'] = Router.current().params.type;
    data['owner_id'] = Router.current().params.id;
    console.log(data);
    Meteor.call('reviews.insert', data, (err, res) => {
      if (err) {
        console.log('error');
      } else {
        instance.state.clear();
        let routeName = Router.current().params.type.slice(0, -1) + '_detail_view';
        Router.go(routeName, {id: Router.current().params.id});
      }
    });
  },

  "click #cancel-button"(e, instance) {
    e.preventDefault();
    let routeName = Router.current().params.type.slice(0, -1) + '_detail_view';
    Router.go(routeName, {id: Router.current().params.id});
  }
  
});

Template.reviewForm.helpers({
  overall() {
    let instance = Template.instance();
    return instance.state.get('overall');
  }
});

function calculateOverall(instance) {
  let dict = instance.state.all();
  let sum = 0;
  delete dict.description;
  delete dict.overall;
  for (i in dict) {
    sum += dict[i];
  }
  return sum/Object.size(dict);
}