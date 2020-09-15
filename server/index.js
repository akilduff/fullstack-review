const express = require('express');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github.js');
// const save = require('../database/index.js');
const addRepos = require('../database/index.js');
const returnRepos = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/repos', urlencodedParser, function (req, res) {
  // check on the post request
  console.log('Received: ', (req.body.user))
  // query the github API for repos by the user
  getReposByUsername.getReposByUsername(req.body.user, (err, result) => {
    if (err) {
      console.log('ERROR on server: ', err)
    } else {
      console.log('RESULT on server: ', result)
      console.log('Type of addedRepos.addedRepos: ',typeof addRepos.addRepos)
      addRepos.addRepos(result)
      return result
    }
  });


  // let the client side know that the connection worked
  res.send('Success')

});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  // console.log('Return Repos: ', returnRepos.returnRepos());

  // invocation of a database function works
  res.send(returnRepos.returnRepos())
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

