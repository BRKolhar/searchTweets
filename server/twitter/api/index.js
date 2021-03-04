const twitterClient = require('../index');
const resolvers = require('../../graphql/resolvers');
// const axios = require('axios');
// let tweetsModel = require("../../models/tweets.js");

// This function will call twitter's Search API with out queryString & emptyParams
function invokeSearchTwitterAPI() {
    try {
        let reqParams = {
            max_results: 10,
            "tweet.fields": "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
            // place: "contained_within,country,country_code,full_name,geo,id,name,place_type",
            query: "tending"
        };
        return twitterClient.get('https://api.twitter.com/2/tweets/search/recent', reqParams, function (error, tweets, response) {
            try {
                if (!error) {
                    console.log(tweets);
                }
                // console.log("######tweets", tweets);  // Tweet body.
                (tweets.data || []).map(tweet => resolvers.createTweet({ tweet }));
                return tweets;
            } catch (error) {
                console.log(error);
            }
        });
    } catch (error) {
        console.log(error)
    }
}

// This function will call twitter's Search API with queryString & optionsParams And store the result to local-MongoDB
function invokeSearchTweetsApiWithQueryStringAndParams(params = {}) {
    /**
     * steps
     *  1. fetch the data from 'https://api.twitter.com/2/tweets/search/recent?query="input-text-for-search"'
     *  2. If required, do data manipulation
     *  3. stroe the result info DB
     */
    try {
        // let queryString = params.queryString || '';
        // let params = {};
        // step-1
        return twitterClient.get(`https://api.twitter.com/2/tweets/search/recent`, params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
            //step-2

            //setp-3
            console.log(tweets);  // Tweet body.
            return tweets;
        });
    } catch (error) {
        console.log(error);
    }
}

function getTrendingTweets(params = {}) {
    /**
     * steps
     *  1. fetch the data from 'GET https://api.twitter.com/1.1/trends/place.json?id=23424848'
     *  2. If required, do data manipulation
     *  3. stroe the result info DB
     */
    try {
        // let queryString = params.queryString || '';
        // let params = {};
        // step-1
        !params.id && (params.id = 23424848)
        return twitterClient.get(`https://api.twitter.com/1.1/trends/place.json`, params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
            //step-2

            //setp-3
            console.log(tweets);  // Tweet body.
            return tweets;
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    invokeSearchTwitterAPI,
    invokeSearchTweetsApiWithQueryStringAndParams,
    getTrendingTweets
};