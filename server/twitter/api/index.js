const twitterClient = require('../index');

// const axios = require('axios');
// let tweetsModel = require("../../models/tweets.js");

// This function will call twitter's Search API with out queryString & emptyParams
function invokeSearchTwitterAPI(){
    try {
        let params = {};
        return twitterClient.get('https://api.twitter.com/2/tweets/search/recent', params, function (error, tweets, response) {
            try {
                if (!error) {
                    console.log(tweets);
                }
                console.log("######tweets", tweets);  // Tweet body.
                // console.log("####response", response);  // Raw response object.
                return {tweets, response};   
            } catch (error) {
                console.log(error);
            }
        });   
    } catch (error) {
        console.log(error)
    }
}

// This function will call twitter's Search API with queryString & optionsParams And store the result to local-MongoDB
function invokeSearchTweetsApiWithQueryStringAndParams(queryString="", params={}) {
    /**
     * steps
     *  1. fetch the data from 'https://api.twitter.com/2/tweets/search/recent?query="input-text-for-search"'
     *  2. If required, do data manipulation
     *  3. stroe the result info DB
     */
    try {
        let queryString = queryString;
        let params = {};
        // step-1
        return twitterClient.get(`https://api.twitter.com/2/tweets/search/recent?query=${queryString}`, params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
            //step-2
    
            //setp-3
            console.log(tweets);  // Tweet body.
            console.log(response);  // Raw response object.
            return {tweets, response};
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    invokeSearchTwitterAPI,
    invokeSearchTweetsApiWithQueryStringAndParams
};