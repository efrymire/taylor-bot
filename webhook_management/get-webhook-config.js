require('dotenv').config()
const request = require('request-promise')
const { auth } = require('../utils')

// request options
const request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/webhooks.json',
  oauth: auth.twitter_oauth
}

// GET request to retreive webhook config
request.get(request_options, function (error, response, body) {
  console.log(body)
})