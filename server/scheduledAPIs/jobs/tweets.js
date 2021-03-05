const twitterEndPoints = require('../../twitter/api');
module.exports = function (CronJob) {
    function fetchSearchTweetsAfterSpeficTime() {
        try {
            let minutes = process.env.TIME_INTERVAL_IN_MINITUES || 1;

            var job = new CronJob(`${minutes} * * * * *`, function () {
                console.log('You will see this message every', minutes, 'min');
                /**
                * steps
                *  1. fetch the data from 'https://api.twitter.com/2/tweets/search/recent'
                *  2. If required, do data manipulation
                *  3. stroe the result info DB
                */
                let params = {};
                let result = twitterEndPoints.invokeSearchTwitterAPI();
            }, null, true, 'America/Los_Angeles');
            return job;
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return [
        fetchSearchTweetsAfterSpeficTime
    ]
}