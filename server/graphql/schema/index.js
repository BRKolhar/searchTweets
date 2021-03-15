const { buildSchema } = require('graphql')


module.exports = buildSchema(`

  type Article {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
  }

  
  input ArticleInput {
    title: String!
    body: String!
  }

  type public_metrics{
    retweet_count : Int
    reply_count : Int
    like_count : Int
    quote_count :Int
  }
  type Tweet {
    _id: ID!
    id: String!
    text: String!
    public_metrics: public_metrics
    createdAt: String
    updatedAt: String
    source: String
  }
  
  type Paging {
    pageNumber: Int
    pageSize: Int
    totalRecords: Int
  }

  type TweetApiResponse {
    data: [Tweet]
    paging: Paging
  }
  
  type trendingTweet {
    name: String
    url: String
    promoted_content: String
    query: String
    tweet_volume: String
  }

  type trendingTweetsArray {
    trends: [trendingTweet]
  }

  input TweetInput {
    id: String!
    text: String!
  }
  
  type TendingTweet {
    name: String!
    url: String!
    promoted_content: String!
    query: String!
    tweet_volume: String!
  }

  type Query {
    articles:[Article!]
    tweets(searchString: [String]):TweetApiResponse
    trendingTweets(weoid: String):[trendingTweetsArray] 
  }

  type Mutation {
    createArticle(article:ArticleInput): Article
    createTweet(tweet:TweetInput): Tweet
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)