require('dotenv').config()

const { tweet_lyrics } = require('./tweet_lyrics')
const crypto = require('crypto')
const request = require('request-promise')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', (process.env.PORT || 5000))

const auth = {}

// twitter info
auth.twitter_oauth = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.USER_TOKEN, // USER SPECIFIC
  token_secret: process.env.USER_TOKEN_SECRET, // USER SPECIFIC
  nonce: process.env.OAUTH_NONCE,
}

get_challenge_response = function (crc_token, consumer_secret) {
  console.log("in get_challenge_response...")
  hmac = crypto.createHmac('sha256', consumer_secret).update(crc_token).digest('base64')
  return hmac
}

/** Receives challenge response check (CRC) **/
app.get('/webhook/twitter', function (request, response) {
  var crc_token = request.query.crc_token
  if (crc_token) {
    var hash = get_challenge_response(crc_token, auth.twitter_oauth.consumer_secret)

    response.status(200);
    response.send({
      response_token: 'sha256=' + hash
    })
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.')
  }
})

/** Subscription management **/
app.get('/subscriptions', function (request, response) {
  var crc_token = request.query.crc_token
  if (crc_token) {
    var hash = get_challenge_response(crc_token, auth.twitter_oauth.consumer_secret)

    response.status(200);
    response.send({
      response_token: 'sha256=' + hash
    })
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.')
  }
})

// post the activity
app.post('/webhook/twitter', function (request, response) {
  console.log("app.post running")
  console.log(request.body)
  tweet_lyrics()
  response.send('200 OK')
})

/** listen **/
const server = app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})


/** Serves the home page **/
app.get('/', function (request, response) {
  response.send('App is running')
})