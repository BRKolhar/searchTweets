const express = require('express')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const Logger = require('./services/logger_service')
const logger = new Logger('searchTweets'); // pass the file name to store the loggers into a file
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers')(logger);
const config = require('./config');
const scheduledCronJobs = require('./scheduledAPIs/cron');
const app = express();

let port = (config && config.port) || 8000;
let mongoDdUrl = (config && config.mongoDdUrl) || '';

app.use('/graphql', graphqlHttp({
    schema:graphqlSchema,
    rootValue:graphqlResolvers,
    graphiql: true
}))

if((process.env.DOES_REQUIRED_SCHEDULED_TWITTER_APIS || '').toUpperCase() === 'TRUE'){
    // cronJob will start
    scheduledCronJobs();
}
const options = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(mongoDdUrl, options)
        .then(() => app.listen(port, console.log('Server is running')))
        .catch(error => { throw error })
