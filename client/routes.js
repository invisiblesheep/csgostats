Router.onBeforeAction(function(){
  if(! Meteor.userId()){
    this.layout("GlobalView");
  } else {
    this.next();
  }
});

Router.onAfterAction(function(){
  if(! Meteor.userId()){
    this.layout("GlobalView");
  } else {
    this.next();
  }
});

Router.route('', function() {

    this.layout("GlobalView");
    if (this.ready()) {
      this.render("HomeView");
    }
});


Router.route('/stats', function() {

    this.layout("GlobalView");
    if (this.ready()) {
      this.render("StatisticsView");
    }

});
