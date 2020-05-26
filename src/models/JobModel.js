import { Events } from 'phaser';
import {EVENT_TYPES} from '../constants';

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
        this.emitter.emit( EVENT_TYPES.JOB_COMPLETE, 1 );
      }
      this.emitter.emit( EVENT_TYPES.TIME_PASSED );
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
      return true;
    }
    else {
      return false;
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
}