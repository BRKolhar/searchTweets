const mongoose = require('mongoose')

const Schema = mongoose.Schema
const tendingTweetSchema = new Schema({
    "name": {
        "type": "String"
    },
    "url": {
        "type": "String"
    },
    "promoted_content": {
        "type": "Mixed"
    },
    "query": {
        "type": "String"
    },
    "tweet_volume": {
        "type": "Number"
    }
}, { timestamps: true });


module.exports = mongoose.model('TendingTweet', tendingTweetSchema)