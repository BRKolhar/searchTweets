let Article = require('../../models/article');
let Tweet = require('../../models/tweet');

module.exports = {

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
        }
        catch (error) {
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
        }
        catch (error) {
            throw error
        }

    },
    createTweet: async args => {
        try {
            let { id, text } = args.tweet
            let tweet = new Tweet({
                id,
                text
            })
            let newTweet = await tweet.save()
            return { ...newTweet._doc, _id: newTweet.id }
        }
        catch (error) {
            throw error
        }
    },
    tweets: async () => {
        try {
            let tweetsFetched = await Tweet.find()
            return tweetsFetched.map(tweet => {
                return {
                    ...tweet._doc,
                    _id: tweet.id,
                    createdAt: new Date(tweet._doc.createdAt).toISOString()
                }
            })
        }
        catch (error) {
            throw error
        }

    },
}