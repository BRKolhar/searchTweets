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
    "attachments": {
        "media_keys": {
            "type": [
                "String"
            ]
        }
    },
    "created_at": {
        "type": "Date"
    },
    "entities": {
        "hashtags": {
            "type": [
                "Mixed"
            ]
        },
        "mentions": {
            "type": [
                "Mixed"
            ]
        },
        "urls": {
            "type": [
                "Mixed"
            ]
        }
    },
    "lang": {
        "type": "String"
    },
    "possibly_sensitive": {
        "type": "Boolean"
    },
    "referenced_tweets": {
        "type": [
            "Mixed"
        ]
    },
    "source": {
        "type": "String"
    },
    "in_reply_to_user_id": {
        "type": "String"
    },
}, { timestamps: true });


module.exports = mongoose.model('Tweet', tweetSchema)