require('dotenv').config()
const request = require('request-promise')
const { auth } = require('../utils')

// request options
const request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/dev/webhooks.json',
  oauth: auth.twitter_oauth,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  form: {
    url: 'https://blank-spaced.herokuapp.com/webhook/twitter'
  }
}

// POST request to create webhook config
request.post(request_options).then(function (body) {
  console.log(body)
}).catch(function (body) {
  console.log(body)
})