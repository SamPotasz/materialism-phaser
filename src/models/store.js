import JobModel from './JobModel';

import {JOBS_DATA} from './jobs.data';

/**
 * Central data store for the app.
 * Holds the current state of the app.
 * 
 * Main components: score and array of individual jobs
 */

const INITIAL_STATE = {
  score: 0,
  jobs: JOBS_DATA,
}

export const loadStore = () => {
  console.log('loading store');
return({
  score: parseInt(localStorage.getItem('score')) || INITIAL_STATE.score,
  jobs: initializeJobs(JOBS_DATA),
})
}

/**
 * takes in array of job data, 
 * returns array of fully-initialized data to use
 * @param {array of jobs} data 
 */
const initializeJobs = data => {
  console.log('initializing jobs');
  console.log(data)
  return Object.values(data).map( 
    jobData => new JobModel( jobData ))
}