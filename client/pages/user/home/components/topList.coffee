Template.schoolTopList.onCreated ->
  @subscribe 'schools.top'

Template.schoolTopList.helpers
  items: ->
    Schools.find()

    
