const mongoose = require('mongoose')

const Schema = mongoose.Schema


const tweetSchema = new Schema({
    "id": {
        "type": "String",
        "required": "true"
    },
    "text": {
        "type": "String",
        "required": "true"
    },
    "conversation_id": {
        "type": "String"
    },
    "referenced_tweets": {
        "type": [
            "Mixed"
        ]
    },
    "source": {
        "type": "String"
    },
    "possibly_sensitive": {
        "type": "Boolean"
    },
    "lang": {
        "type": "String"
    },
    "author_id": {
        "type": "String"
    },
    "entities": {
        "mentions": {
            "type": [
                "Mixed"
            ]
        }
    },
    "reply_settings": {
        "type": "String"
    },
    "context_annotations": {
        "type": [
            "Mixed"
        ]
    },
    "public_metrics": {
        "retweet_count": {
            "type": "Number"
        },
        "reply_count": {
            "type": "Number"
        },
        "like_count": {
            "type": "Number"
        },
        "quote_count": {
            "type": "Number"
        }
    },
    "created_at": {
        "type": "Date"
    }
}, { timestamps: true });


module.exports = mongoose.model('Tweet', tweetSchema)