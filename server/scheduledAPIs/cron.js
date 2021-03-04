/**
 * This module handle Cron-Jobs
 */

var CronJob = require('cron').CronJob;
let cronJobsForTwitterAPIs = require('./jobs/tweets')(CronJob);
var twitterEndPoints = require('../twitter/api');

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