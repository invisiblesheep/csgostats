Router.route('', function() {

    this.layout("GlobalView");
    /*this.wait(Meteor.subscribe('subjects'), Session.get("currentApplication"));
    this.wait(Meteor.subscribe('stream-prototypes'), Session.get("currentApplication"));
    this.wait(Meteor.subscribe('stream-instances'), Session.get("currentApplication"));

    this.wait(this.subscribe("application-streamdata"), Session.get("currentApplication"));*/

    if (this.ready()) {
      this.render("HomeView");
    }

    //layoutTemplate: 'GlobalView',
    //template: 'HomeView',
    //waitOn: function() {
    //  return Meteor.subscribe('applications');
    //}
});


Router.route('/stats', function() {

    this.layout("GlobalView");
    /*this.wait(Meteor.subscribe('subjects'), Session.get("currentApplication"));
    this.wait(Meteor.subscribe('stream-prototypes'), Session.get("currentApplication"));
    this.wait(Meteor.subscribe('stream-instances'), Session.get("currentApplication"));

    this.wait(this.subscribe("application-streamdata"), Session.get("currentApplication"));*/

    if (this.ready()) {
      this.render("StatisticsView");
    }

    //layoutTemplate: 'GlobalView',
    //template: 'HomeView',
    //waitOn: function() {
    //  return Meteor.subscribe('applications');
    //}
});
