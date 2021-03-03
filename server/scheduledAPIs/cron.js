/**
 * This module handle Cron-Jobs
 */

var CronJob = require('cron').CronJob;
let cronJobsForTwitterAPIs = require('./jobs/tweets')(CronJob);
var twitterEndPoints = require('../twitter/api');

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

module.exports = function startCronJobs() {
  try {
    let jobs = [];

    // collect all the jobs to start them in loop
    (cronJobsForTwitterAPIs || []).map(f => {
      if(typeof f === 'function') {
        // here 'f' will return a 'cron-job', whill we invoke later
        jobs.push(f());
      }
    });

    // Now start the jobs
    jobs.forEach(job => job.start());
  } catch (error) {
    console.log("error while running corn-jobs", error);
  }
}