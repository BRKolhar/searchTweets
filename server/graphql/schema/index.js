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

  type Tweet {
    _id: ID!
    id: String!
    text: String!
  }

  input TweetInput {
    id: String!
    text: String!
  }
  
  type Query {
    articles:[Article!]
    tweets:[Tweet!]
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