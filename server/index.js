const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
const saveCreate = require('../database/index.js');
const returnRepos = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/repos', urlencodedParser, function (req, res,) {
  // check on the post request
  console.log('Received: ', (req.body.user))
  // query the github API for repos by the user
  getReposByUsername.getReposByUsername(req.body.user, (err, result) => {
    if (err) {
      console.log('ERROR on Github Search: ', err)
    } else {
      saveCreate.saveCreate(result, (err, result2) => {
        if (err) {
          console.log('ERROR on Saving to MongoDBßs: ', err)
        } else {
          return result2
        }
      })
      return result
    }
  });


  returnRepos.returnRepos((err, result) => {
    if (err) {
      console.log('No Repos Returned From MongoDB')
    } else {
      var arrayWithForks = [];
      var minFork = {};
      for (var i = 0; i < result.length; i++) {
        var tempForkCount = result[i].forkCount
        if (arrayWithForks.length < 25) {
          arrayWithForks.push(result[i])
          for (var j = 0; j < arrayWithForks.length; j++) {
            if (tempForkCount < minFork.count || minFork.count === undefined) {
              minFork.count = tempForkCount;
              minFork.index = j;
            }
          }
        } else if (tempForkCount > minFork.count) {
          arrayWithForks[minFork.index] = result[i];
          minFork.count = tempForkCount;
          for (var j = 0; j < arrayWithForks.length; j++) {
            if (arrayWithForks[j].forkCount < tempForkCount) {
              minFork.count = arrayWithForks[j].forkCount;
              minFork.index = j;
            }
          }

        }
      }
      console.log(arrayWithForks.length)
      arrayWithForks.sort(function(a,b) {
        return b.forkCount - a.forkCount;
      })
      res.send(arrayWithForks)
    }
  })

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  // console.log('Return Repos: ', returnRepos.returnRepos());

  returnRepos.returnRepos((err, result) => {
    if (err) {
      console.log('No Repos Returned From MongoDB')
    } else {
      var arrayWithForks = [];
      var minFork = {};
      for (var i = 0; i < result.length; i++) {
        var tempForkCount = result[i].forkCount
        if (arrayWithForks.length < 25) {
          arrayWithForks.push(result[i])
          for (var j = 0; j < arrayWithForks.length; j++) {
            if (tempForkCount < minFork.count || minFork.count === undefined) {
              minFork.count = tempForkCount;
              minFork.index = j;
            }
          }
        } else if (tempForkCount > minFork.count) {
          arrayWithForks[minFork.index] = result[i];
          minFork.count = tempForkCount;
          for (var j = 0; j < arrayWithForks.length; j++) {
            if (arrayWithForks[j].forkCount < tempForkCount) {
              minFork.count = arrayWithForks[j].forkCount;
              minFork.index = j;
            }
          }

        }
      }
      console.log(arrayWithForks.length)
      arrayWithForks.sort(function(a,b) {
        return b.forkCount - a.forkCount;
      })
      res.send(arrayWithForks)
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

