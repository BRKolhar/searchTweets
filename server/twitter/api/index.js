const twitterClient = require('../index');
const resolvers = require('../../graphql/resolvers');
let Tweet = require('../../models/tweet');
let TrendingTweet = require('../../models/terendingTweets');

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
        return new Promise((resolve, reject) => {
            twitterClient.get('https://api.twitter.com/2/tweets/search/recent', reqParams, function (error, tweets, response) {
                try {
                    if (error) {
                        reject(error);
                    }
                    if (tweets.data && tweets.data.length) {
                        (tweets.data).map(async (t) => {
                            // remove the duplicate
                            Tweet.findOneAndDelete({id: t.id});
                            let tweet = new Tweet({ ...t });
                            //insert new recored
                            await tweet.save();
                        })
                        // Tweet.insertMany(tweets.data);
                    }
                    resolve(tweets);
                } catch (error) {
                    reject(error);
                }
            });
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
        return new Promise((resolve, reject) => {
            // step-1
            twitterClient.get(`https://api.twitter.com/2/tweets/search/recent`, params, function (error, tweets, response) {
                if (error) {
                    reject(error);
                }
                //step-2

                //setp-3
                if (tweets.data && tweets.data.length) {
                    (tweets.data).map(async (t) => {
                        // remove the duplicate
                        Tweet.findOneAndDelete({id: t.id});
                        let tweet = new Tweet({ ...t });
                        //insert new recored
                        await tweet.save();
                    })
                    // Tweet.insertMany(tweets.data);
                }
                resolve(tweets);
            });
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
        // step-1
        params.weoid && (params.id = params.weoid)
        !params.id && (params.id = 23424848) // we are assigning 'india-weoid' as default 'id'
        return new Promise((resolve, reject) => {
            twitterClient.get(`https://api.twitter.com/1.1/trends/place.json`, params, function (error, tweets, response) {
                try {
                    if (error) {
                        reject(error);
                    }
                    //step-2

                    //setp-3
                    if (tweets.data && tweets.data.length) {
                        (tweets.data).map(async(t) => {
                            // remove the duplicate
                            TrendingTweet.findOneAndDelete({id: t.id});
                            let tweet = new TrendingTweet({ ...t });
                            //insert new recored
                            await tweet.save();
                        })
                        // TrendingTweet.insertMany(tweets.data);
                    }
                    resolve(tweets);
                } catch (error) {
                    reject(error);
                }
            });
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