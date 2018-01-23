var request = require('request');
var secrets = require('./secrets').GITHUB_TOKEN;
var fs = require('fs');

var filename = 0;


console.log('Welcome to the GitHub Avatar Downloader!');


// generates URL based on parameters
function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined | repoName === undefined) {
    console.log('\n[-- Error: please enter values for both <repoOwner> and <repoName>. --]');
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + secrets
      }
    };

    // callback
    request(options, function(err, res, body) {
      cb(err, body);

    });
  }
}

// downloads image to 'avatar' folder
function downloadImageByURL(url, filePath) {
  request(url)
    .on('error', function(err) {
      throw err;
    })
    .on('end', function(end) {
      console.log('Download of avatar ' + (filename++) + ' complete.');
    })
    .pipe(fs.createWriteStream(filePath + (filename++) + '.jpg'));
}


getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  var sort = JSON.parse(result);
  sort.forEach(function(avatar) {
    downloadImageByURL(avatar.avatar_url, "avatars/pic");
  });
});


