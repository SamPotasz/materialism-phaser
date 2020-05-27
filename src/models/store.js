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

  unlockJob( jobId ) {
    const jobModel = this.getJobById( jobId );
    if( jobModel ) {
      jobModel.unlock( this.score );
      this.setScore( this.score - jobModel.unlockCost )
    }
  }

  upgradeJob( jobId ) {
    const jobModel = this.getJobById( jobId );
    if( jobModel ) {
      const cost = jobModel.upgradeCost
      if( jobModel.canUpgrade( cost ) ) {
        jobModel.upgrade();
        this.setScore( this.score - cost )
      }
    }
  }

  activateApp( jobId ) {
    const jobModel = this.getJobById( jobId );
    if( jobModel ) {
      if( jobModel.canPurchaseApp( this.score ) ) {
        jobModel.activateApp();
        this.setScore( this.score - jobModel.student.cost );
      }
    }
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

  /**
   * Bool of whether or not any apps are currently available for purchase
   */
  areAnyAppsAvailable() {
    let toReturn = false;
    this.jobs.forEach( job => {
      if( job.canPurchaseApp(this.score) ){
        toReturn = true;
      }
    })
    return toReturn;
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