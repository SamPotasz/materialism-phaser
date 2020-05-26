import { Events } from 'phaser';
import {CONFIG, EVENT_TYPES} from '../constants';

import StudentModel from './StudentModel';

export default class JobModel {
  constructor(jobData) {
    Object.assign( this, jobData );
    this.lastUpdate = Date.now();
    this.isActive = false;
    
    this.student = new StudentModel(jobData.student);

    this.emitter = new Events.EventEmitter();
  }

  onTimePassed( newTime ) {
    if( this.isActive ) {
      this.lastUpdate = newTime;

      if( newTime >= this.finishesAt ) {
        this.isActive = false;
        this.saveToStorage();
        this.emitter.emit( EVENT_TYPES.JOB_FINISHED, this, 1 );
      }
      this.emitter.emit( EVENT_TYPES.TIME_PASSED, this );
    }
  }

  /**
   * tries to start the job.
   * returns bool of whether or not it was successful in doing so
   */
  tryToStart() {
    if( this.isAbleToStart ) {
      this.isActive = true;
      this.lastUpdate = Date.now();
      this.startedAt = this.lastUpdate;

      this.saveToStorage();

      return true;
    }
    else {
      return false;
    }
  }

  saveToStorage() {
    localStorage.setItem(CONFIG.JOBS_KEY + this.id, 
      JSON.stringify(this.saveData));
  }

  /**
   * Try to unlock this job
   * @param {points in the game} currPoints 
   */
  unlock( currPoints ) {
    if( currPoints >= this.unlockCost ){
      this.isUnlocked = true;
      this.saveToStorage();
    }
  }

  get isAbleToStart() {
    return !this.isActive && this.isUnlocked;
  }

  /**
   * get millisecond value current job will earn points at
   */
  get finishesAt() {
    return this.startedAt + this.duration;
  }

  get saveData() {
    return {
      isActive: this.isActive,
      startedAt: this.startedAt,
      isUnlocked: this.isUnlocked,
    }
  }
}