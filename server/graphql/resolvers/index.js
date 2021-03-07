let Article = require('../../models/article');
let Tweet = require('../../models/tweet');
var tweetHandlers = require('../../twitter/api');
const mongoose = require('mongoose')

module.exports = function (logger) {
    this.logger = logger;
    return {
        articles: async () => {
            try {
                let articlesFetched = await Article.find()
                return articlesFetched.map(article => {
                    return {
                        ...article._doc,
                        _id: article.id,
                        createdAt: new Date(article._doc.createdAt).toISOString()
                    }
                })
            } catch (error) {
                throw error
            }

        },
        createArticle: async args => {
            try {
                let { title, body } = args.article
                let article = new Article({
                    title,
                    body
                })
                let newArticle = await article.save()
                return { ...newArticle._doc, _id: newArticle.id }
            } catch (error) {
                throw error
            }

        },
        createTweet: async args => {
            this.logger && this.logger.info && this.logger.info('create Tweet API', args || {});
            try {
                if (!args.tweet) return { msg: 'Please send tweet detailes in request', status: 200 };
                let { id, text } = args.tweet;
                let tweet = new Tweet({ id, ...args.tweet });
                // let tweet = new Tweet({
                //     _id: mongoose.Types.ObjectId(id),
                //     ...args.tweet
                // }, {_id: false})
                let newTweet = await tweet.save()
                return { ...newTweet._doc, _id: newTweet.id }
            } catch (error) {
                throw error
            }
        },
        tweets: async (args) => {
            try {
                this.logger && this.logger.info && this.logger.info('fetch tweets API', args || {});
                /**
                 * 1st, search for tweens in our DB. 
                 * If not found, 
                 *  1. get from Twitter-dev-server
                 *  2. store into our DB
                 *  3. send the same data to FE
                 */
                const { searchString } = args || {};
                let regex = `^.*${searchString || ''}.*$`;
                let tweetsFetched = await Tweet.find({ text: { $regex: regex, $options: 'i' } });
                let dataFormatting = function (data) {
                    return (data || []).map(tweet => {
                        return {
                            ...tweet._doc,
                            _id: tweet.id,
                            createdAt: new Date(tweet._doc.createdAt).toISOString(),
                            updatedAt: new Date(tweet._doc.updatedAt).toISOString()
                        }
                    });
                }
                if (tweetsFetched.length) {
                    return dataFormatting(tweetsFetched)
                }
                /** invoking Twitter-dev-server to fetch the data */
                const { maxResult } = args;
                let reqParams = {
                    max_results: maxResult || 10,
                    "tweet.fields": "attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,possibly_sensitive,referenced_tweets,reply_settings,source,text,withheld",
                    query: searchString || ''
                };
                let result = await tweetHandlers.invokeSearchTweetsApiWithQueryStringAndParams(reqParams);
                let tweetsFetched1 = await Tweet.find({ text: { $regex: regex, $options: 'i' } });
                return dataFormatting(tweetsFetched1);
            } catch (error) {
                throw error
            }

        },
        trendingTweets: async (args) => {
            let { weoid } = args;
            try {
                this.logger && this.logger.info && this.logger.info('fetch trendingTweets API', args || {});
                // API => 
                // WOIED code for India=>  23424848
                let result = await tweetHandlers.getTrendingTweets({ weoid });
                return result;
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    }
}