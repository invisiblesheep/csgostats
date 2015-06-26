
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});


Template.MainNavigation.helpers({

});



Template.StatisticsView.helpers({
  games: function(){
    return Games.find({userid: Meteor.userId()}, {sort: {createdAt: -1}});
  },


});

Template.StatisticsView.events({
  "click #submitButton": function(){
    Games.insert({
      map: map.value,
      score: score.value,
      kills: parseFloat(kills.value),
      assists: parseFloat(assists.value),
      deaths: parseFloat(deaths.value),
      createdAt: new Date(),
      userid: Meteor.userId()
    });

    map.value = "";
    score.value = "";
    kills.value = "";
    assists.value = "";
    deaths.value = "";

    return false;
  },
  "click .close": function(){
    Games.remove(this._id);
  }
});

  Template.stats.helpers({
    kd: function(){
      var kills = 0;
      var deaths = 0;
      var kdratio = 0;
      Games.find({userid: Meteor.userId()}, {fields: {kills: 1, deaths: 1}}).map(function(doc) {
        kills += doc.kills;
        deaths += doc.deaths;
      });
      kdratio = kills/deaths;
      return kdratio.toString();
    },
    winp: function(){
      var winp = 0;
      var temp;
      var won = 0;
      var amount = 0;
      Games.find({userid: Meteor.userId()}, {fields: {score: 1}}).map(function(doc) {
        amount = amount + 1;
        temp = doc.score.split("-");
        if(temp[0] == "16"){
          won = won + 1;
        }
      });
      winp = (won/amount)*100;
      return winp;
    }
  });
