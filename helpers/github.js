const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (handle, callback)=> {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${handle}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  var reposByUser = [];

  axios.get(options.url)
    .then((response) => {
      reposByUser = response.data;
      return callback(null, reposByUser);
    })
    .catch(function(error) {
      console.log('ERROR in AXIOS: ', error)
      return callback(err, null);
    })

  return

}

module.exports.getReposByUsername = getReposByUsername;