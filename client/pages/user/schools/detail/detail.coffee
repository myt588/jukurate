Template.schoolDetailView.onCreated ->
  @subscribe 'schools.id', Router.current().params.id

Template.schoolDetailView.helpers
  school: ->
    Schools.findOne _id: Router.current().params.id

    
