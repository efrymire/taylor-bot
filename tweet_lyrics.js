require('dotenv').config()
const request = require('request-promise')
let { auth } = require('./utils')

const createRequestOps = (tweet) => {
	const request_options = {
		oauth: auth.twitter_oauth,
		url: 'https://api.twitter.com/1.1/statuses/update.json?status=' + encodeURIComponent(tweet),
	}
	return request_options
}

const postResponse = (request_options) => {
	request.post(request_options).then(function (body) {
		console.log(body)
	}).catch(function (body) {
		console.log(body)
	})
}

module.exports.tweet_lyrics = tweet_lyrics = () => {
	// const tweet = "test"
	// console.log(tweet)
	console.log("running 'tweet_lyrics'")
	const tweet = " I was riding shotgun with my hair undone in the front seat of his car, He's got a one-hand feel on the steering wheel, The other on my heart, I look around, turn the radio down, he says, 'baby is something wrong?' I say 'nothing, I was just thinking how we don't have a song,'  And he says,"
	postResponse(createRequestOps(tweet));
}
