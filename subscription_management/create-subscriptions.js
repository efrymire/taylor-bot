require('dotenv').config()
const request = require('request-promise')
const { auth } = require('../utils')

//request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/subscriptions.json',
  oauth: auth.twitter_oauth,
  resolveWithFullResponse: true
}

request.post(request_options, function (error, response, body) {
  console.log(body)
}).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription added.')
  }
}).catch(function (response) {
  console.log('Full error message below:')
  console.log(response.error)
})