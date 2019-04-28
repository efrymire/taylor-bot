require('dotenv').config()

module.exports = {
  auth: {
    twitter_oauth: {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: process.env.ACCESS_TOKEN,
      token_secret: process.env.TOKEN_SECRET,
    }
  }
}