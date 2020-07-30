var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    app.post("/api/friends", function(req, res) {
      var friendMatch = {
        name: "",
        photo: "",
        friendDifferences: Infinity
      };
  
      var userData = req.body;
      var userScores = userData.scores;
  
      var totalDifferences;

      for (var i = 0; i < friends.length; i++) {
        var currFriend = friends[i];
        totalDifferences = 0;
  
        console.log(currFriend.name);

        for (var j = 0; j < currFriend.scores.length; j++) {
          var currFriendScore = currFriend.scores[j];
          var currUserScore = userScores[j];

          totalDifferences += Math.abs(parseInt(currUserScore) - parseInt(currFriendScore));
        }

        if (totalDifferences <= friendMatch.friendDifferences) {
          friendMatch.name = currFriend.name;
          friendMatch.photo = currFriend.photo;
          friendMatch.friendDifferences = totalDifferences;
        }
      }
  
      friends.push(userData);

      res.json(friendMatch);
    });
  };