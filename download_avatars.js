var request = require('request');
var secrets = require('./secrets').GITHUB_TOKEN;


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets
    }
  };


  request(options, function(err, res, body) {
    cb(err, body);

  });
 }

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  var sort = JSON.parse(result);
  sort.forEach(function(avatar){
  console.log(avatar.avatar_url);
  });
});

