const express = require('express')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolvers')
const config = require('./config');
const app = express();

let port = (config && config.port) || 8000;
let mongoDdUrl = (config && config.mongoDdUrl) || '';

app.use('/graphql', graphqlHttp({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql: true
}))

const options = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(mongoDdUrl, options)
        .then(() => app.listen(port, console.log('Server is running')))
        .catch(error => { throw error })
