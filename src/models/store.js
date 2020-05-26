import { CONFIG } from '../constants';
import {JOBS_DATA} from './jobs.data';

import JobModel from './JobModel';


/**
 * Central data store for the app.
 * Holds the current state of the app.
 * 
 * Main components: score and array of individual jobs
 */

const INITIAL_STATE = {
  score: 100,
  jobs: JOBS_DATA,
}

export default class GameState {
  constructor() {
    this.loadStore();
  }

  loadStore() {
    console.log('loading store');
  
    this.score = parseInt(localStorage.getItem(CONFIG.SCORE_KEY)) || INITIAL_STATE.score;
    this.jobs = initializeJobs(JOBS_DATA);
    this.lastUpdate = Date.now();
  }

  onTimePassed() {
    // const now = Date.now();
    // const diff = now - this.lastUpdate;
    // console.log(`time since update: ${diff}`)
    this.lastUpdate = Date.now();
    this.jobs.map( jobModel => jobModel.onTimePassed(this.lastUpdate) )
  }

  setScore( value ) {
    this.score = value;
    localStorage.setItem(CONFIG.SCORE_KEY, this.score);
  }

  /**
   * gets job model with given ID
   * @param {jobId} id 
   */
  getJobById( id ) {
    return this.jobs.find( job => job.id === id );
  }
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
    jobData => {
      const localData = JSON.parse(localStorage.getItem(CONFIG.JOBS_KEY + jobData.id))
      return new JobModel( {...jobData, ...localData} )
    }
  )
}