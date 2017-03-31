Template.schoolListStyle1.onCreated ->
  @subscribe 'schools.top'

Template.schoolListStyle1.helpers
  items: ->
    Schools.find()

    
