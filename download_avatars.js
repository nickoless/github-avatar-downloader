var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(reoOwner, repoName, cb) {

}

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors:", err);
  console.log("Result:", result);
});