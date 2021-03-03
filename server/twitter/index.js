/**
 * This file will hold the module 'twitterAPI' module, which will interact with 'twitterDevAccount'
 */
const Twitter = require('twitter');
var twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

module.exports = twitterClient;