
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
    var rounds = 0;
    var temp = score.value.split("-");
    rounds = parseFloat(temp[0]) + parseFloat(temp[1]);
    var rating = Number(((parseFloat(kills.value)/rounds/0.679) + 0.7*((rounds-parseFloat(deaths.value))/rounds/0.317) + 1.277)/2.7).toFixed(3);
    var kpr = Number(parseFloat(kills.value)/rounds).toFixed(2);
    Games.insert({
      map: map.value,
      score: score.value,
      kills: parseFloat(kills.value),
      assists: parseFloat(assists.value),
      deaths: parseFloat(deaths.value),
      mvp: parseFloat(mvp.value),
      rank: rank.value,
      rating: rating,
      kpr: kpr,
      createdAt: new Date(),
      userid: Meteor.userId()
    });

    map.value = "";
    score.value = "";
    kills.value = "";
    assists.value = "";
    deaths.value = "";
    mvp.value = "";
    rank.value = "";

    return false;
  },
  "click .close": function(){
    Games.remove(this._id);
  },


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
      return Number((kdratio).toFixed(2));
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
      return Number((winp).toFixed(2));
    },
    mvpStars: function(){
      var mvpstars = 0;
      var games = 0;
      Games.find({userid: Meteor.userId()}, {fields: {mvp: 1}}).map(function(doc){
        games++;
        mvpstars += doc.mvp;
      });
      return Number((mvpstars/games).toFixed(2));
    },
    rounds: function(){
      var rounds = 0;
      var games = 0;
      Games.find({userid: Meteor.userId()}, {fields: {score: 1}}).map(function(doc) {
        games++;
        rounds += parseFloat(doc.score.split("-"));
      });
      return Number((rounds/games).toFixed(2));
    },
    kpr: function(){
      var kills = 0;
      var temp;
      var rounds = 0;
      Games.find({userid: Meteor.userId()}, {fields: {score: 1, kills: 1}}).map(function(doc){
        kills += doc.kills;
        temp = doc.score.split("-");
        rounds += parseFloat(temp[0]);
        rounds += parseFloat(temp[1]);
      });
      return Number((kills/rounds).toFixed(2));
    },
    averageRating: function(){
      var amount = 0;
      var rating = 0.0;
      Games.find({userid: Meteor.userId()}, {fields: {rating: 1}}).map(function(doc){
          amount++;
          rating += parseFloat(doc.rating);
      });
      return Number(rating/amount).toFixed(2);
    }
    /* rating: function(kills, deaths, rounds){
      //HLTV.org rating without round multikills
      var killRating = kills/rounds/0.679;
      var survivalRating = (rounds-deaths)/rounds/0.317;
      var roundswithmultiplekillsrating = 1.277;

      return (killRating + 0.7*survivalRating + roundswithmultiplekillsrating)/2.7;
    }
    */

  });
