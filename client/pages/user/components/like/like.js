Template.like.onCreated(function(){
	this.autorun(()=>{
		this.collection = ReactiveVar(Template.instance().data.collection);
		this.id = ReactiveVar(Template.instance().data.id);
		if (Meteor.user()) {
			this.liked = ReactiveVar(Meteor.user().liked(this.collection.get(), this.id.get()));
		} else {
			this.liked = ReactiveVar(false);
		}
	})

});

Template.like.onRendered(function(){

});

Template.like.events({
	"click #like": (e, template) => {
		if (Meteor.user()){
			if(template.liked.get()) {
				Meteor.call('unlike', template.collection.get(), template.id.get());
			} else {	
				Meteor.call('like', template.collection.get(), template.id.get());
			}
		} else {
			Bert.alert( `Please Log In to like your item`, 'warning' );
		}
	}
});

Template.like.helpers({
	liked() {
		return Template.instance().liked.get();
	},
	title() {
		return Template.instance().liked.get() ? 'unlike' : 'like';
	}
})
